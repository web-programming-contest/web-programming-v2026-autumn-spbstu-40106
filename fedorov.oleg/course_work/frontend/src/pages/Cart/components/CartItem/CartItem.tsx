import { formatPrice } from '@/utils/format'
import styles from './CartItem.module.scss'

interface CartItemProps {
  id: number | string
  title: string
  price: number
  image: string
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

export const CartItem = ({
  title,
  price,
  image,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <img src={image} alt={title} className={styles.itemImage} />

      <div className={styles.itemInfo}>
        <h4 className={styles.itemTitle}>{title}</h4>
        <span className={styles.itemPrice}>{formatPrice(price)} ₽</span>
      </div>

      <div className={styles.counter}>
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>

      <div className={styles.itemTotal}>{formatPrice(price * quantity)} ₽</div>

      <button className={styles.deleteBtn} onClick={onRemove}>
        ✕
      </button>
    </div>
  )
}
