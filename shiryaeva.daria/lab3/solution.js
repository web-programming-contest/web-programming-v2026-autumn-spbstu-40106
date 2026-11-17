export function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  const result = [];

  for (const item of arr1) {
    if (set2.has(item) && !result.includes(item)) {
      result.push(item);
    }
  }

  return result;
}
