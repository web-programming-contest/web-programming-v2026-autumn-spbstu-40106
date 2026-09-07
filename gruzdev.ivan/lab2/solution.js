const ZODIAC_SIGNS = [
  {name: 'Козерог', endMonth: 1, endDay: 19},
  {name: 'Водолей', endMonth: 2, endDay: 18},
  {name: 'Рыбы', endMonth: 3, endDay: 20},
  {name: 'Овен', endMonth: 4, endDay: 19},
  {name: 'Телец', endMonth: 5, endDay: 20},
  {name: 'Близнецы', endMonth: 6, endDay: 20},
  {name: 'Рак', endMonth: 7, endDay: 22},
  {name: 'Лев', endMonth: 8, endDay: 22},
  {name: 'Дева', endMonth: 9, endDay: 22},
  {name: 'Весы', endMonth: 10, endDay: 22},
  {name: 'Скорпион', endMonth: 11, endDay: 21},
  {name: 'Стрелец', endMonth: 12, endDay: 21},
  {name: 'Козерог', endMonth: 12, endDay: 31},
];

export function getZodiacSign(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return ZODIAC_SIGNS.find(
    (sign) =>
      month < sign.endMonth || (month === sign.endMonth && day <= sign.endDay),
  ).name;
}
