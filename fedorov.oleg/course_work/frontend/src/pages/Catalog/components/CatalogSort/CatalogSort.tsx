import { SortType } from '@/types'
import styles from './CatalogSort.module.scss'

interface CatalogSortProps {
  currentSort: SortType
  onSortChange: (sort: SortType) => void
}

const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Новые', value: 'new' },
  { label: 'Популярные', value: 'popular' },
  { label: 'Подешевле', value: 'cheap' },
  { label: 'Подороже', value: 'expensive' },
]

export const CatalogSort = ({
  currentSort,
  onSortChange,
}: CatalogSortProps) => {
  return (
    <div className={styles.sortBar}>
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={[
            styles.chip,
            currentSort === option.value ? styles.active : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
