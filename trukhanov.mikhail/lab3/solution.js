export function mergeArrays(arr1, arr2) {
  const mergedArray = [...arr1, ...arr2];
  const uniqueSet = new Set(mergedArray);

  return [...uniqueSet];
}
