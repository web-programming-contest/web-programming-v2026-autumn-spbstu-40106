export function rotateArray(arr, steps) {
  if (arr.length === 0) {
    return [];
  }

  const shift = steps % arr.length;

  if (shift === 0) {
    return [...arr];
  }

  return [...arr.slice(-shift), ...arr.slice(0, -shift)];
}
