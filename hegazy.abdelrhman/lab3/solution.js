export function sortByFrequency(arr) {
  const counts = new Map();

  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }

  return [...arr].sort((a, b) => counts.get(b) - counts.get(a));
}
