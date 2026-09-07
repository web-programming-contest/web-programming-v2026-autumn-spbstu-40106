export function sortByFrequency(arr) {
  const frequency = new Map();

  for (const item of arr) {
    let count = frequency.get(item);

    if (count === undefined) {
      count = 0;
    }
    count = count + 1;

    frequency.set(item, count);
}

  const result = [...arr];

  result.sort((a, b) => {
    return frequency.get(b) - frequency.get(a);
  });

  return result;
}