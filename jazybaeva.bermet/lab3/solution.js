export function moveZerosToEnd(arr) {
  const nonZeros = [];
  let zeroCount = 0;

  for (const item of arr) {
    if (item === 0) {
      zeroCount += 1;
    } else {
      nonZeros.push(item);
    }
  }

  for (let i = 0; i < zeroCount; i += 1) {
    nonZeros.push(0);
  }

  return nonZeros;
}
