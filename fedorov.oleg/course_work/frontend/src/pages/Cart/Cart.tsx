import { useState } from 'react'
import { useCartStore } from '@store/useCartStore'
import { toast } from 'sonner'
import styles from './Cart.module.scss'
import { CartItem, CartSummary, OrderHistory } from './components'
import { CheckoutModal, ConfirmModal } from '@/components'

export const Cart = () => {
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart')
  const [isClearModalOpen, setIsClearModalOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const { items, updateQuantity, removeItem, clearCart } = useCartStore()

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const handleClearAll = () => {
    clearCart()
    setIsClearModalOpen(false)
    toast.info('Корзина полностью очищена')
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={[
              styles.tab,
              activeTab === 'cart' ? styles.activeTab : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setActiveTab('cart')}
          >
            Корзина ({items.length})
          </button>
          <button
            className={[
              styles.tab,
              activeTab === 'orders' ? styles.activeTab : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setActiveTab('orders')}
          >
            История заказов
          </button>
        </div>

        {activeTab === 'cart' ? (
          <div className={styles.cartContent}>
            {items.length > 0 ? (
              <div className={styles.layout}>
                <div className={styles.itemsList}>
                  <div className={styles.listHeader}>
                    <span>Товары</span>
                    <button
                      className={styles.clearBtn}
                      onClick={() => setIsClearModalOpen(true)}
                    >
                      Очистить корзину
                    </button>
                  </div>

                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onIncrease={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      onDecrease={() => {
                        if (item.quantity === 1) {
                          removeItem(item.id)
                          toast.info(`Товар удален из корзины`)
                        } else {
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      }}
                      onRemove={() => {
                        removeItem(item.id)
                        toast.info(`Товар удален из корзины`)
                      }}
                    />
                  ))}
                </div>

                <CartSummary
                  totalCount={totalCount}
                  totalPrice={totalPrice}
                  onCheckout={() => setIsCheckoutOpen(true)}
                />
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h2>Ваша корзина пуста</h2>
                <p>Добавьте товары из каталога, чтобы сделать заказ.</p>
              </div>
            )}
          </div>
        ) : (
          <OrderHistory />
        )}
      </div>

      <ConfirmModal
        isOpen={isClearModalOpen}
        title="Очистить корзину?"
        message="Вы действительно хотите удалить все товары из корзины? Это действие нельзя отменить."
        onConfirm={handleClearAll}
        onClose={() => setIsClearModalOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={() => setActiveTab('orders')}
      />
    </div>
  )
}
