export function countVowels(str) {
  if (typeof str !== 'string') {
    return 0;
  }
  const match = str.match(/[aeiou]/gi);

  return match ? match.length : 0;
}
