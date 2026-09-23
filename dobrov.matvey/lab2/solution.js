export function toBinary(num) {
  if (!Number.isSafeInteger(num)) {
    throw new TypeError('Ожидается целое число в безопасном диапазоне Number');
  }

  return num.toString(2);
}
