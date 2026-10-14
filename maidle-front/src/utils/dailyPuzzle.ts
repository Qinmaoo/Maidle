import { Chart } from "../types/chart";

const TOKYO_TIME_ZONE = "Asia/Tokyo";

export function getTokyoDateKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TOKYO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

export function getDailySeed(dateKey: string): number {
  return Number(dateKey.replaceAll("-", ""));
}

function randomFromSeed(seed: number): number {
  let state = seed;
  state += 0x6d2b79f5;
  let value = Math.imul(state ^ (state >>> 15), state | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

function chartSortKey(chart: Chart): string {
  return [
    chart.song,
    chart.difficulty,
    chart.type,
    chart.level,
    chart.category,
    chart.artist,
    chart.bpm,
    chart.version,
    chart.image,
  ].join("\u0000");
}

export function selectDailyChart(
  charts: Chart[],
  dateKey: string = getTokyoDateKey(),
): Chart | null {
  if (charts.length === 0) {
    return null;
  }

  const orderedCharts = [...charts].sort((first, second) => {
    const firstKey = chartSortKey(first);
    const secondKey = chartSortKey(second);
    return firstKey < secondKey ? -1 : firstKey > secondKey ? 1 : 0;
  });
  const index = Math.floor(randomFromSeed(getDailySeed(dateKey)) * orderedCharts.length);

  return orderedCharts[index];
}
