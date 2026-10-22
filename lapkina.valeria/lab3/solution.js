export function countOccurrences(arr) {
  const counts = new Map();

  for (const element of arr) {
    const key = String(element);
    const currentCount = counts.get(key) ?? 0;

    counts.set(key, currentCount + 1);
  }

  return Object.fromEntries(counts);
}
