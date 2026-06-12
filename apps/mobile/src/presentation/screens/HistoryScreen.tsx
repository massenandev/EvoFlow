import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { addDays, isoToday } from "../../application/date-range";
import { Habit, HabitCompletion } from "../../domain/types";
import { HabitApiClient } from "../../infrastructure/api-client";
import { Button } from "../components/Button";
import { AppTheme } from "../theme/theme";

type HistoryRange = "week" | "month" | "year";

const ranges: { key: HistoryRange; label: string }[] = [
  { key: "week", label: "This week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" }
];
const calendarColumnWidth = "14.2857142857%" as const;

interface Props {
  api: HabitApiClient;
  deviceId: string;
  habits: Habit[];
  theme: AppTheme;
  onBack: () => void;
}

export function HistoryScreen({ api, deviceId, habits, theme, onBack }: Props) {
  const [range, setRange] = useState<HistoryRange>("month");
  const [selectedMonth, setSelectedMonth] = useState(() => monthStart(isoToday()));
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionsByHabitId, setCompletionsByHabitId] = useState<Record<string, HabitCompletion[]>>({});
  const today = useMemo(() => isoToday(), []);
  const monthOptions = useMemo(() => monthsInCurrentYear(today), [today]);
  const { from, to } = useMemo(() => rangeBounds(range, today, selectedMonth), [range, selectedMonth, today]);
  const dates = useMemo(() => dateRange(from, to), [from, to]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          habits.map(async (habit) => {
            const history = await api.history(habit.id, deviceId, from, to);
            return [habit.id, history] as const;
          })
        );

        if (!active) {
          return;
        }

        setCompletionsByHabitId(Object.fromEntries(results));
      } catch (err) {
        if (!active) {
          return;
        }
        setError(err instanceof Error ? err.message : "Unable to load habit history.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [api, deviceId, from, habits, to]);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>History</Text>
      <View style={styles.filters}>
        {ranges.map((item) => (
          <Button key={item.key} label={item.label} theme={theme} variant={range === item.key ? "primary" : "secondary"} onPress={() => setRange(item.key)} />
        ))}
      </View>
      {range === "month" ? (
        <View style={styles.monthPicker}>
          <Pressable
            onPress={() => setMonthMenuOpen((open) => !open)}
            style={[styles.monthSelect, { borderColor: theme.border, backgroundColor: theme.surface }]}
          >
            <Text style={[styles.monthPickerTitle, { color: theme.text }]}>{monthTitle(selectedMonth)}</Text>
            <Text style={[styles.monthSelectChevron, { color: theme.muted }]}>{monthMenuOpen ? "▲" : "▼"}</Text>
          </Pressable>
          {monthMenuOpen ? (
            <View style={[styles.monthMenu, { borderColor: theme.border, backgroundColor: theme.surface }]}>
              {monthOptions.map((month) => (
                <Pressable
                  key={month}
                  onPress={() => {
                    setSelectedMonth(month);
                    setMonthMenuOpen(false);
                  }}
                  style={[styles.monthOption, selectedMonth === month ? { backgroundColor: theme.primary } : null]}
                >
                  <Text style={[styles.monthOptionText, { color: selectedMonth === month ? "#FFFFFF" : theme.text }]}>{monthTitle(month)}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
      {loading ? <ActivityIndicator color={theme.primary} /> : null}
      {error ? <Text style={[styles.error, { color: theme.danger }]}>{error}</Text> : null}
      {habits.map((habit) => {
        const completions = completionsByHabitId[habit.id] ?? habit.completions;
        const completedDates = new Set(completions.filter((item) => item.count >= habit.goal.completionsPerDay).map((item) => item.date));
        const completedCount = dates.filter((date) => completedDates.has(date)).length;
        return (
          <View key={habit.id} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.name, { color: theme.text }]}>
                {habit.emoji || "✅"} {habit.name}
              </Text>
              <Text style={[styles.count, { color: theme.muted }]}>
                {completedCount}/{dates.length}
              </Text>
            </View>
            {range === "week" ? <WeekHistory dates={dates} completedDates={completedDates} color={habit.color} theme={theme} /> : null}
            {range === "month" ? <MonthHistory dates={dates} completedDates={completedDates} color={habit.color} theme={theme} /> : null}
            {range === "year" ? <YearHistory dates={dates} completedDates={completedDates} color={habit.color} theme={theme} /> : null}
          </View>
        );
      })}
      {!loading && habits.length === 0 ? <Text style={[styles.empty, { color: theme.muted }]}>No habits yet.</Text> : null}
      <Button label="Back" theme={theme} variant="secondary" onPress={onBack} />
    </ScrollView>
  );
}

function WeekHistory({ dates, completedDates, color, theme }: { dates: string[]; completedDates: Set<string>; color: string; theme: AppTheme }) {
  return (
    <View style={styles.weekCalendar}>
      {dates.map((date) => {
        const completed = completedDates.has(date);
        return (
          <View key={date} style={styles.weekDay}>
            <Text style={[styles.weekday, { color: theme.muted }]}>{weekdayLabel(date)}</Text>
            <View style={[styles.dot, { borderColor: color, backgroundColor: completed ? color : "transparent" }]} />
          </View>
        );
      })}
    </View>
  );
}

function MonthHistory({ dates, completedDates, color, theme }: { dates: string[]; completedDates: Set<string>; color: string; theme: AppTheme }) {
  return (
    <>
      <View style={styles.weekdays}>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <Text key={`${day}-${index}`} style={[styles.monthWeekday, { color: theme.muted }]}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.monthCalendar}>
        {Array.from({ length: leadingBlankCount(dates[0]) }, (_, index) => (
          <View key={`blank-${index}`} style={styles.monthDay} />
        ))}
        {dates.map((date) => {
          const completed = completedDates.has(date);
          return (
            <View key={date} style={styles.monthDay}>
              <View style={[styles.dot, { borderColor: color, backgroundColor: completed ? color : "transparent" }]} />
            </View>
          );
        })}
      </View>
    </>
  );
}

function YearHistory({ dates, completedDates, color, theme }: { dates: string[]; completedDates: Set<string>; color: string; theme: AppTheme }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.yearCalendar}>
      {chunk(dates, 5).map((column) => (
        <View key={column[0]} style={styles.yearColumn}>
          {column.map((date) => {
            const completed = completedDates.has(date);
            return (
              <View
                key={date}
                style={[styles.yearDot, { borderColor: color, backgroundColor: completed ? color : "transparent", opacity: completed ? 1 : theme.dark ? 0.55 : 0.7 }]}
              />
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

function rangeBounds(range: HistoryRange, today: string, selectedMonth: string): { from: string; to: string } {
  if (range === "week") {
    const from = addDays(today, -new Date(`${today}T00:00:00.000Z`).getUTCDay());
    return { from, to: addDays(from, 6) };
  }

  if (range === "month") {
    return { from: selectedMonth, to: monthEnd(selectedMonth) };
  }

  const value = new Date(`${today}T00:00:00.000Z`);
  value.setUTCFullYear(value.getUTCFullYear() - 1);
  return { from: value.toISOString().slice(0, 10), to: today };
}

function dateRange(from: string, to: string): string[] {
  const dates: string[] = [];
  let cursor = from;
  while (cursor <= to) {
    dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}

function leadingBlankCount(date: string): number {
  return new Date(`${date}T00:00:00.000Z`).getUTCDay();
}

function weekdayLabel(date: string): string {
  return new Date(`${date}T00:00:00.000Z`).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }).slice(0, 1);
}

function monthStart(date: string): string {
  return `${date.slice(0, 7)}-01`;
}

function monthEnd(date: string): string {
  const value = new Date(`${monthStart(date)}T00:00:00.000Z`);
  value.setUTCMonth(value.getUTCMonth() + 1);
  value.setUTCDate(0);
  return value.toISOString().slice(0, 10);
}

function monthsInCurrentYear(today: string): string[] {
  const year = today.slice(0, 4);
  return Array.from({ length: 12 }, (_, index) => `${year}-${String(index + 1).padStart(2, "0")}-01`);
}

function monthTitle(date: string): string {
  return new Date(`${monthStart(date)}T00:00:00.000Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 64,
    gap: 14
  },
  title: {
    fontSize: 28,
    fontWeight: "900"
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  monthPicker: {
    gap: 8
  },
  monthSelect: {
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  monthPickerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "900"
  },
  monthSelectChevron: {
    fontSize: 12,
    fontWeight: "900"
  },
  monthMenu: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden"
  },
  monthOption: {
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 14
  },
  monthOptionText: {
    fontSize: 15,
    fontWeight: "800"
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    gap: 12
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800"
  },
  count: {
    fontSize: 13,
    fontWeight: "800"
  },
  weekCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4
  },
  weekDay: {
    flex: 1,
    minWidth: 38,
    alignItems: "center",
    gap: 6
  },
  weekday: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "800"
  },
  weekdays: {
    flexDirection: "row"
  },
  monthWeekday: {
    width: calendarColumnWidth,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "800"
  },
  monthCalendar: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  monthDay: {
    width: calendarColumnWidth,
    minHeight: 28,
    alignItems: "center"
  },
  yearCalendar: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 2
  },
  yearColumn: {
    gap: 5
  },
  yearDot: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 999
  },
  dot: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 999
  },
  empty: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 15
  },
  error: {
    fontSize: 14,
    fontWeight: "700"
  }
});
