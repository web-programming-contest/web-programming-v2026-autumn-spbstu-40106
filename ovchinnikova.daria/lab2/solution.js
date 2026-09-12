export function convertBase(num, fromBase, toBase) {
  const decimal = parseInt(num, fromBase);
  return decimal.toString(toBase);
}
