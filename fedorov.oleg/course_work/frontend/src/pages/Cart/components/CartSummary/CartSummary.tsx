import { Button } from '@components/ui/Button/Button'
import { formatPrice } from '@/utils/format'
import styles from './CartSummary.module.scss'

interface CartSummaryProps {
  totalCount: number
  totalPrice: number
  onCheckout: () => void
}

export const CartSummary = ({
  totalCount,
  totalPrice,
  onCheckout,
}: CartSummaryProps) => {
  return (
    <div className={styles.summaryCard}>
      <h3>Ваш заказ</h3>
      <div className={styles.summaryRow}>
        <span>Товары ({totalCount})</span>
        <span>{formatPrice(totalPrice)} ₽</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Доставка</span>
        <span>Бесплатно</span>
      </div>
      <div className={styles.summaryTotal}>
        <span>Итого</span>
        <span>{formatPrice(totalPrice)} ₽</span>
      </div>

      <Button
        variant="blue"
        className={styles.checkoutBtn}
        onClick={onCheckout}
      >
        Перейти к оформлению
      </Button>
    </div>
  )
}
