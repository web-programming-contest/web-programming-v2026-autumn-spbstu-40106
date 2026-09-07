import { toast } from 'sonner'
import { Product } from '@/types'
import { useCartStore } from '@store/useCartStore'
import { Button } from '@components/ui/Button/Button'
import { formatPrice } from '@/utils/format'
import styles from './ProductCard.module.scss'

import starIcon from '@assets/images/icons/star.png'

interface ProductCardProps {
  product: Product
  onCardClick: (product: Product) => void
}

export const ProductCard = ({ product, onCardClick }: ProductCardProps) => {
  const { items, addItem, updateQuantity, removeItem } = useCartStore()

  const cartItem = items.find((item) => item.id === product?.id)
  const quantity = cartItem?.quantity || 0

  if (!product) return null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    toast.success(`Товар "${product.title}" добавлен в корзину`)
  }

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation()
    updateQuantity(product.id, quantity + 1)
  }

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (quantity === 1) {
      removeItem(product.id)
      toast.info(`Товар "${product.title}" удален из корзины`)
    } else {
      updateQuantity(product.id, quantity - 1)
    }
  }

  return (
    <div className={styles.card} onClick={() => onCardClick(product)}>
      <div className={styles.imageContainer}>
        {product.labels && product.labels.length > 0 && (
          <div className={styles.labels}>
            {product.labels.map((label) => (
              <span
                key={label}
                className={[
                  styles.label,
                  styles[label === 'Новинка' ? 'new' : 'hit'],
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {label}
              </span>
            ))}
          </div>
        )}
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <div className={styles.price}>{formatPrice(product.price)} ₽</div>

        <div className={styles.rating}>
          <img src={starIcon} alt="Рейтинг" />
          <span>{product.rating ?? 0}</span>
        </div>

        <h3 className={styles.title} title={product.title}>
          {product.title}
        </h3>
      </div>

      <div className={styles.actions}>
        {quantity > 0 ? (
          <div className={styles.counter}>
            <button onClick={handleDecrease} className={styles.counterBtn}>
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button onClick={handleIncrease} className={styles.counterBtn}>
              +
            </button>
          </div>
        ) : (
          <Button onClick={handleAddToCart} className={styles.addBtn}>
            В корзину
          </Button>
        )}
      </div>
    </div>
  )
}
