export function mergeArrays(arr1, arr2) {
  const result = [];
  const seen = new Set();

  for (const item of [...arr1, ...arr2]) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}
