export function findEquilibriumIndex(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return -1;
  }

  const totalSum = arr.reduce((acc, val) => acc + val, 0);
  let leftSum = 0;

  for (let i = 0; i < arr.length; i++) {
    const rightSum = totalSum - leftSum - arr[i];

    if (leftSum === rightSum) {
      return i;
    }

    leftSum += arr[i];
  }

  return -1;
}
