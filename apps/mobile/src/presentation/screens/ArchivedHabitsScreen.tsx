import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { addDays, isoToday } from "../../application/date-range";
import { Habit } from "../../domain/types";
import { HabitApiClient } from "../../infrastructure/api-client";
import { Button } from "../components/Button";
import { AppTheme } from "../theme/theme";

interface Props {
  api: HabitApiClient;
  deviceId: string;
  theme: AppTheme;
  onBack: () => void;
  onHabitsChanged: () => Promise<void>;
}

export function ArchivedHabitsScreen({ api, deviceId, theme, onBack, onHabitsChanged }: Props) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionHabitId, setActionHabitId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const to = useMemo(() => isoToday(), []);
  const from = useMemo(() => addDays(to, -3650), [to]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const archived = await api.listArchivedHabits(deviceId, from, to);
        if (active) {
          setHabits(archived);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load archived habits.");
        }
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
  }, [api, deviceId, from, to]);

  async function restoreHabit(habit: Habit) {
    setActionHabitId(habit.id);
    try {
      await api.restoreHabit(habit.id, deviceId);
      setHabits((items) => items.filter((item) => item.id !== habit.id));
      await onHabitsChanged();
    } catch (err) {
      Alert.alert("Could not restore habit", err instanceof Error ? err.message : "Try again.");
    } finally {
      setActionHabitId(null);
    }
  }

  function deleteHabit(habit: Habit) {
    Alert.alert("Delete habit", "This permanently removes the habit and its history.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setActionHabitId(habit.id);
          void api.deleteHabit(habit.id, deviceId).then(async () => {
            setHabits((items) => items.filter((item) => item.id !== habit.id));
            await onHabitsChanged();
          }).catch((err) => {
            Alert.alert("Could not delete habit", err instanceof Error ? err.message : "Try again.");
          }).finally(() => {
            setActionHabitId(null);
          });
        }
      }
    ]);
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Archived habits</Text>
      {loading ? <ActivityIndicator color={theme.primary} /> : null}
      {error ? <Text style={[styles.error, { color: theme.danger }]}>{error}</Text> : null}
      {habits.map((habit) => {
        const actionDisabled = actionHabitId === habit.id;
        return (
          <View key={habit.id} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.name, { color: theme.text }]}>
                {habit.emoji || "✅"} {habit.name}
              </Text>
              <Text style={[styles.meta, { color: theme.muted }]}>Archived</Text>
            </View>
            <Text style={[styles.meta, { color: theme.muted }]}>
              Best streak: {habit.streak.best} day{habit.streak.best === 1 ? "" : "s"}
            </Text>
            <View style={styles.actions}>
              <Button label={actionDisabled ? "Restoring..." : "Restore"} theme={theme} variant="secondary" onPress={() => restoreHabit(habit)} disabled={actionDisabled} />
              <Button label={actionDisabled ? "Deleting..." : "Delete"} theme={theme} variant="danger" onPress={() => deleteHabit(habit)} disabled={actionDisabled} />
            </View>
          </View>
        );
      })}
      {!loading && habits.length === 0 ? <Text style={[styles.empty, { color: theme.muted }]}>No archived habits.</Text> : null}
      <Button label="Back" theme={theme} variant="secondary" onPress={onBack} />
    </ScrollView>
  );
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
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    gap: 10
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
  meta: {
    fontSize: 13,
    fontWeight: "700"
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
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
