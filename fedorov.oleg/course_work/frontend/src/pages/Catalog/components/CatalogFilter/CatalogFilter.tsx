import { useState } from 'react'
import { FilterState } from '@/types'
import { Button } from '@components/ui/Button/Button'
import { Input } from '@components/ui/Input/Input'
import styles from './CatalogFilter.module.scss'

interface CatalogFilterProps {
  onApply: (filters: FilterState) => void
  onReset: () => void
}

const AVAILABLE_TYPES = [
  'Смартфоны',
  'Фитнес браслеты',
  'Умные часы',
  'Очки виртуальной реальности',
]
const AVAILABLE_COLORS = ['Красный', 'Синий', 'Желтый', 'Зеленый']

export const CatalogFilter = ({ onApply, onReset }: CatalogFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceFrom: '',
    priceTo: '',
    types: [],
    colors: [],
  })

  const handleCheckboxChange = (field: 'types' | 'colors', value: string) => {
    setFilters((prev) => {
      const currentList = prev[field]
      const isChecked = currentList.includes(value)
      return {
        ...prev,
        [field]: isChecked
          ? currentList.filter((item) => item !== value)
          : [...currentList, value],
      }
    })
  }

  const handleReset = () => {
    setFilters({ priceFrom: '', priceTo: '', types: [], colors: [] })
    onReset()
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterGroup}>
        <h4>Цена, ₽</h4>
        <div className={styles.priceRow}>
          <Input
            placeholder="От"
            value={filters.priceFrom}
            onChange={(e) =>
              setFilters({ ...filters, priceFrom: e.target.value })
            }
            type="number"
          />
          <Input
            placeholder="До"
            value={filters.priceTo}
            onChange={(e) =>
              setFilters({ ...filters, priceTo: e.target.value })
            }
            type="number"
          />
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h4>Тип товара</h4>
        {AVAILABLE_TYPES.map((type) => (
          <label key={type} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.types.includes(type)}
              onChange={() => handleCheckboxChange('types', type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h4>Цвет</h4>
        {AVAILABLE_COLORS.map((color) => (
          <label key={color} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.colors.includes(color)}
              onChange={() => handleCheckboxChange('colors', color)}
            />
            <span>{color}</span>
          </label>
        ))}
      </div>

      <div className={styles.actions}>
        <Button variant="blue" onClick={() => onApply(filters)}>
          Показать
        </Button>
        <button className={styles.resetBtn} onClick={handleReset}>
          Сбросить
        </button>
      </div>
    </aside>
  )
}
