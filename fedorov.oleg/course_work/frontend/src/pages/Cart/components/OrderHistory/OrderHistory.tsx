import { useEffect, useState } from 'react'
import { api } from '@api/index'
import { toast } from 'sonner'
import styles from './OrderHistory.module.scss'
import { Order } from '@/types'
import { Loader } from '@/components'
import { formatPrice } from '@/utils/format'

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.getOrders()
        setOrders(data)
      } catch {
        toast.error('Не удалось загрузить историю заказов')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return <Loader size={'small'} />
  }

  if (orders.length === 0) {
    return (
      <div className={styles.state}>
        <h2>История заказов пуста</h2>
        <p>Вы пока не оформляли заказы в нашем магазине.</p>
      </div>
    )
  }

  return (
    <div className={styles.ordersList}>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <span className={styles.orderId}>Заказ №{order.id}</span>
            <span className={styles.orderDate}>
              {new Date(order.createdAt).toLocaleDateString('ru-RU')}
            </span>
          </div>

          <div className={styles.orderItems}>
            {order.items.map((item, index) => (
              <div key={index} className={styles.orderItemRow}>
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <span>{formatPrice(item.price * item.quantity)} ₽</span>
              </div>
            ))}
          </div>

          <div className={styles.orderFooter}>
            <span>Итого:</span>
            <span className={styles.orderTotal}>
              {formatPrice(order.totalPrice)} ₽
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
