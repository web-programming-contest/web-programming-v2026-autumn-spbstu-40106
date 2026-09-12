export function moveZerosToEnd(arr) {
  const result = [];
  const zeros = [];

  for (const item of arr) {
    if (item === 0) {
      zeros.push(item);
    } else {
      result.push(item);
    }
  }

  return [...result, ...zeros];
}
