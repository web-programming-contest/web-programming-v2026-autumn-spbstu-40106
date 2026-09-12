import { Product } from '@/types'
import { useCartStore } from '@store/useCartStore'
import { toast } from 'sonner'
import styles from './ProductModal.module.scss'

import starIcon from '@assets/images/icons/star.png'
import { Button, Modal } from '../ui'
import { formatPrice } from '@/utils/format'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
}: ProductModalProps) => {
  const { items, addItem, updateQuantity, removeItem } = useCartStore()

  if (!product) return null

  const cartItem = items.find((item) => item.id === product.id)
  const quantity = cartItem?.quantity || 0

  const handleAddToCart = () => {
    addItem(product)
    toast.success(`Товар "${product.title}" добавлен в корзину`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalBody}>
        <div className={styles.imageWrapper}>
          {product.labels &&
            product.labels.map((label) => (
              <span key={label} className={styles.label}>
                {label}
              </span>
            ))}
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.rating}>
            <img src={starIcon} alt="Рейтинг" />
            <span>{product.rating}</span>
          </div>

          <h2 className={styles.title}>{product.title}</h2>

          <p className={styles.description}>
            {product.description || 'Описание отсутствует.'}
          </p>

          {product.specs && (
            <div className={styles.specs}>
              <h4>Характеристики</h4>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className={styles.specRow}>
                  <span className={styles.specKey}>{key}</span>
                  <span className={styles.specVal}>{value}</span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.footer}>
            <span className={styles.price}>{formatPrice(product.price)} ₽</span>

            <div className={styles.cartControl}>
              {quantity > 0 ? (
                <div className={styles.counterSection}>
                  <div className={styles.counter}>
                    <button
                      onClick={() =>
                        quantity === 1
                          ? removeItem(product.id)
                          : updateQuantity(product.id, quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className={styles.inCartInfo}>
                    В корзине: {quantity} шт.
                  </span>
                </div>
              ) : (
                <Button onClick={handleAddToCart} variant="blue">
                  В корзину
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
