import { Product } from '@/types'
import { ProductCard } from '../ProductCard/ProductCard'
import styles from './ProductSlider.module.scss'

interface ProductSliderProps {
  title: string
  subtitle?: string
  products: Product[]
  onCardClick: (product: Product) => void
}

export const ProductSlider = ({
  title,
  subtitle,
  products,
  onCardClick,
}: ProductSliderProps) => {
  return (
    <section className={styles.sliderSection}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {!products || products.length === 0 ? (
        <div className={styles.emptyState}>
          <p>В данной категории пока нет товаров.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      )}
    </section>
  )
}
