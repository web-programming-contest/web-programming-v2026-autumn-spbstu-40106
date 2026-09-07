export const formatPrice = (price?: number | null): string => {
  if (price == null || isNaN(price)) {
    return '0'
  }
  return price.toLocaleString('ru-RU')
}
