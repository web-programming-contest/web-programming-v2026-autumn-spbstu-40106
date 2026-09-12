export function timeAgo(date) {
  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} секунд назад`;
  }

  if (minutes < 60) {
    if (minutes === 1) {
      return '1 минуту назад';
    }

    if (minutes >= 2 && minutes <= 4) {
      return `${minutes} минуты назад`;
    }

    return `${minutes} минут назад`;
  }

  if (hours < 24) {
    if (hours === 1) {
      return '1 час назад';
    }

    if (hours >= 2 && hours <= 4) {
      return `${hours} часа назад`;
    }

    return `${hours} часов назад`;
  }

  if (days === 1) {
    return '1 день назад';
  }

  if (days >= 2 && days <= 4) {
    return `${days} дня назад`;
  }

  return `${days} дней назад`;
}
