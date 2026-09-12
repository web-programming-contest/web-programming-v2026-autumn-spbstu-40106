import { useState } from 'react'
import { api } from '@api/index'
import { useCartStore } from '@store/useCartStore'
import { DeliveryType, PaymentMethod, OrderPayload } from '@/types'
import { toast } from 'sonner'

export const useCheckout = (onSuccessCallback: () => void) => {
  const { items, clearCart } = useCartStore()

  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('доставка')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('По карте')
  const [requiresPackaging, setRequiresPackaging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const submitOrder = async () => {
    if (!phone.trim()) {
      toast.error('Введите номер телефона')
      return
    }

    if (deliveryType === 'доставка' && !address.trim()) {
      toast.error('Укажите адрес доставки')
      return
    }

    setIsLoading(true)

    try {
      const payload: OrderPayload = {
        phone,
        email,
        deliveryType,
        address: deliveryType === 'доставка' ? address : undefined,
        paymentMethod,
        requiresPackaging,
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: totalPrice,
      }

      const { data } = await api.createOrder(payload)

      toast.success(
        `Заказ успешно оформлен! Номер заказа: ${data.id || 'Принят'}`,
      )
      clearCart()
      onSuccessCallback()
    } catch {
      toast.error('Ошибка при оформлении заказа')
    } finally {
      setIsLoading(false)
    }
  }

  return {
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
  }
}
