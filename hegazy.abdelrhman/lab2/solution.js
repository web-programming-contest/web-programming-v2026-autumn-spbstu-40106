const ZODIAC_CUTOFFS = [
  {cutoff: 119, sign: 'Козерог'},
  {cutoff: 218, sign: 'Водолей'},
  {cutoff: 320, sign: 'Рыбы'},
  {cutoff: 419, sign: 'Овен'},
  {cutoff: 520, sign: 'Телец'},
  {cutoff: 620, sign: 'Близнецы'},
  {cutoff: 722, sign: 'Рак'},
  {cutoff: 822, sign: 'Лев'},
  {cutoff: 922, sign: 'Дева'},
  {cutoff: 1022, sign: 'Весы'},
  {cutoff: 1121, sign: 'Скорпион'},
  {cutoff: 1221, sign: 'Стрелец'},
  {cutoff: 1231, sign: 'Козерог'},
];

export function getZodiacSign(date) {
  const d = date instanceof Date ? date : new Date(date);

  if (Number.isNaN(d.getTime())) {
    throw new Error('Invalid date provided');
  }

  const month = d.getMonth() + 1;
  const day = d.getDate();
  const monthDay = month * 100 + day;

  const match = ZODIAC_CUTOFFS.find((entry) => monthDay <= entry.cutoff);

  return match.sign;
}
