export function intersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const result = [];

  for (const item of set1) {
    if (set2.has(item)) {
      result.push(item);
    }
  }

  return result;
}
