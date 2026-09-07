import { SortType } from '@/types'

export const ITEMS_PER_PAGE = 6

export const AVAILABLE_TYPES = [
  'Смартфоны',
  'Фитнес браслеты',
  'Портативная акустика',
  'Очки виртуальной реальности',
  'Электротранспорт',
  'Умные часы',
]

export const AVAILABLE_COLORS = [
  'Красный',
  'Оранжевый',
  'Желтый',
  'Зеленый',
  'Голубой',
  'Синий',
  'Фиолетовый',
]

export const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Новые', value: 'new' },
  { label: 'Популярные', value: 'popular' },
  { label: 'Подешевле', value: 'cheap' },
  { label: 'Подороже', value: 'expensive' },
]
