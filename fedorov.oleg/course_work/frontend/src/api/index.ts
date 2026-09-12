import axios from 'axios'
import { apiClient } from './client'
import {
  Product,
  Order,
  OrderPayload,
  AuthResponse,
  PromoProduct,
} from '@/types'

export const api = {
  login: (username: string, password?: string) =>
    apiClient.post<AuthResponse>('/auth/login', { email: username, password }),

  logout: () => apiClient.post('/auth/logout'),

  refresh: (refreshToken: string) =>
    axios.post<AuthResponse>('http://localhost:8080/refresh', { refreshToken }),

  getPromo: () => apiClient.get<PromoProduct>('/promo'),
  getGoods: () => apiClient.get<Product[]>('/goods'),
  getOrders: () => apiClient.get<Order[]>('/orders'),
  createOrder: (orderData: OrderPayload) =>
    apiClient.post('/orders', orderData),
}
