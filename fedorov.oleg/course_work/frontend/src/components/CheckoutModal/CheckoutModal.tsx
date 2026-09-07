import { Modal } from '@components/ui/Modal/Modal'
import { Input } from '@components/ui/Input/Input'
import { Button } from '@components/ui/Button/Button'
import { useCheckout } from '@hooks/useCheckout'
import styles from './CheckoutModal.module.scss'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const CheckoutModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CheckoutModalProps) => {
  const {
    phone,
    setPhone,
    email,
    setEmail,
    address,
    setAddress,
    deliveryType,
    setDeliveryType,
    paymentMethod,
    setPaymentMethod,
    requiresPackaging,
    setRequiresPackaging,
    totalPrice,
    isLoading,
    submitOrder,
  } = useCheckout(() => {
    onSuccess()
    onClose()
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.form}>
        <h2>Оформление заказа</h2>

        <div className={styles.fields}>
          <Input
            label="Телефон *"
            placeholder="+7 (999) 000-00-00"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="example@domain.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={styles.radioGroup}>
            <label>Способ получения:</label>
            <div className={styles.row}>
              <button
                type="button"
                className={[
                  styles.chip,
                  deliveryType === 'доставка' ? styles.active : '',
                ].join(' ')}
                onClick={() => setDeliveryType('доставка')}
              >
                Доставка
              </button>
              <button
                type="button"
                className={[
                  styles.chip,
                  deliveryType === 'самовывоз' ? styles.active : '',
                ].join(' ')}
                onClick={() => setDeliveryType('самовывоз')}
              >
                Самовывоз
              </button>
            </div>
          </div>

          {deliveryType === 'доставка' && (
            <Input
              label="Адрес доставки *"
              placeholder="Город, улица, дом, квартира"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          )}

          <div className={styles.radioGroup}>
            <label>Способ оплаты:</label>
            <div className={styles.row}>
              <button
                type="button"
                className={[
                  styles.chip,
                  paymentMethod === 'По карте' ? styles.active : '',
                ].join(' ')}
                onClick={() => setPaymentMethod('По карте')}
              >
                По карте
              </button>
              <button
                type="button"
                className={[
                  styles.chip,
                  paymentMethod === 'Наличными' ? styles.active : '',
                ].join(' ')}
                onClick={() => setPaymentMethod('Наличными')}
              >
                Наличными
              </button>
            </div>
          </div>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={requiresPackaging}
              onChange={(e) => setRequiresPackaging(e.target.checked)}
            />
            <span>Требуется подарочная упаковка</span>
          </label>
        </div>

        <div className={styles.footer}>
          <div className={styles.totalInfo}>
            <span>Сумма к оплате:</span>
            <span className={styles.totalPrice}>
              {totalPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <Button
            type="button"
            variant="blue"
            disabled={isLoading}
            onClick={submitOrder}
          >
            {isLoading ? 'Оформление...' : 'Подтвердить заказ'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
