import { Habit } from "../domain/types";

export function isCompletedForDate(habit: Habit, date: string): boolean {
  const completion = habit.completions.find((item) => item.date === date);
  return (completion?.count ?? 0) >= habit.goal.completionsPerDay;
}

export function completedDaysInWeek(habit: Habit, date: string): number {
  const { from, to } = weekBounds(date);
  return habit.completions.filter((item) => item.date >= from && item.date <= to && item.count >= habit.goal.completionsPerDay).length;
}

export function reachedWeeklyTarget(habit: Habit, date: string): boolean {
  return completedDaysInWeek(habit, date) >= (habit.goal.targetDaysPerWeek ?? 7);
}

export function streakGoalLabel(goal: Habit["goal"]["streakGoal"]): string {
  const labels: Record<Habit["goal"]["streakGoal"], string> = {
    none: "None",
    daily: "Daily",
    week: "Week",
    month: "Month"
  };
  return labels[goal];
}

function weekBounds(date: string): { from: string; to: string } {
  const current = new Date(`${date}T00:00:00.000Z`);
  const day = current.getUTCDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = addDays(current, mondayOffset);
  const sunday = addDays(monday, 6);
  return { from: toIsoDate(monday), to: toIsoDate(sunday) };
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
