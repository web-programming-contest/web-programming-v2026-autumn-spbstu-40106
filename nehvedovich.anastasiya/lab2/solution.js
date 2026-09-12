export function getZodiacSign(date) {
  const month = date.getMonth();
  const day = date.getDate();

  if ((month === 2 && day >= 21) || (month === 3 && day <= 19)) {
    return 'Овен';
  }

  if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) {
    return 'Телец';
  }

  if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
    return 'Близнецы';
  }

  if ((month === 5 && day >= 21) || (month === 6 && day <= 22)) {
    return 'Рак';
  }

  if ((month === 6 && day >= 23) || (month === 7 && day <= 22)) {
    return 'Лев';
  }

  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Дева';
  }

  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Весы';
  }

  if ((month === 9 && day >= 23) || (month === 10 && day <= 21)) {
    return 'Скорпион';
  }

  if ((month === 10 && day >= 22) || (month === 11 && day <= 21)) {
    return 'Стрелец';
  }

  if ((month === 11 && day >= 22) || (month === 0 && day <= 19)) {
    return 'Козерог';
  }

  if ((month === 0 && day >= 20) || (month === 1 && day <= 18)) {
    return 'Водолей';
  }

  return 'Рыбы';
}
