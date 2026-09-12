export type DeliveryType = 'самовывоз' | 'доставка'
export type PaymentMethod = 'По карте' | 'Наличными'
export type SortType = 'popular' | 'cheap' | 'expensive' | 'new'

export interface Product {
  id: string
  title: string
  price: number
  rating: number
  image: string
  type: string
  color: string
  description?: string
  specs?: Record<string, string>
  labels?: string[]
}

export interface PromoProduct extends Product {
  oldPrice?: number
  discount?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: number | string
  createdAt: string
  totalPrice: number
  items: {
    id: number | string
    title: string
    price: number
    quantity: number
  }[]
}

export interface User {
  username: string
}

export interface OrderPayload {
  phone: string
  email?: string
  deliveryType: DeliveryType
  address?: string
  paymentMethod: PaymentMethod
  requiresPackaging: boolean
  items: Array<{
    id: number | string
    title: string
    price: number
    quantity: number
  }>
  total: number
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  username: string
}

export interface FilterState {
  priceFrom: string
  priceTo: string
  types: string[]
  colors: string[]
}
