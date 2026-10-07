function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return one;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return few;
  }
  return many;
}

export function timeAgo(date) {
  const past = new Date(date);
  const now = new Date();
  const diffSec = Math.floor((now - past) / 1000);

  if (diffSec < 0) {
    return 'в будущем';
  }
  if (diffSec < 5) {
    return 'только что';
  }

  const units = [
    {sec: 60, names: ['секунда', 'секунды', 'секунд'], div: 1},
    {sec: 3600, names: ['минута', 'минуты', 'минут'], div: 60},
    {sec: 86400, names: ['час', 'часа', 'часов'], div: 3600},
    {sec: 2592000, names: ['день', 'дня', 'дней'], div: 86400},
    {sec: 31536000, names: ['месяц', 'месяца', 'месяцев'], div: 2592000},
    {sec: Infinity, names: ['год', 'года', 'лет'], div: 31536000},
  ];

  for (const u of units) {
    if (diffSec < u.sec) {
      const value = Math.floor(diffSec / u.div);
      return `${value} ${plural(value, ...u.names)} назад`;
    }
  }
}
