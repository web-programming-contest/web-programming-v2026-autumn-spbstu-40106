export function findLongestPalindrome(str) {
  if (typeof str !== 'string' || str.length <= 1) {
    return str || '';
  }

  let start = 0;
  let maxLength = 0;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  for (let i = 0; i < str.length; i++) {
    const lenOdd = expandAroundCenter(i, i);
    const lenEven = expandAroundCenter(i, i + 1);
    const currentMax = Math.max(lenOdd, lenEven);

    if (currentMax > maxLength) {
      maxLength = currentMax;
      start = i - Math.floor((currentMax - 1) / 2);
    }
  }

  return str.slice(start, start + maxLength);
}
