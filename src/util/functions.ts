// Форматирование числа (замена точки на запятую и добавление пробелов)
export function formatNumber(num: number): string {
  return num
    .toLocaleString('ru-RU', {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 10,
    })
    .replace(/\./g, ',')
    .replace(/ /g, ' ')
}
