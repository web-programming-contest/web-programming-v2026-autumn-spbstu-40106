export function sortByFrequency(arr) {
  const frequency = new Map();

  for (const item of arr) {
    frequency.set(item, (frequency.get(item) ?? 0) + 1);
  }

  return [...arr].sort((a, b) => frequency.get(b) - frequency.get(a));
}
