import { useState, useEffect, useMemo } from 'react'
import { api } from '@api/index'
import { Product, FilterState, SortType } from '@/types'
import { ITEMS_PER_PAGE } from '@/constants'

export const useCatalog = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null)
  const [sort, setSort] = useState<SortType>('new')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const { data } = await api.getGoods()
        setProducts(data)
      } catch (error) {
        console.error('Ошибка загрузки товаров', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGoods()
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    if (activeFilters) {
      if (activeFilters.priceFrom) {
        result = result.filter(
          (p) => p.price >= Number(activeFilters.priceFrom),
        )
      }
      if (activeFilters.priceTo) {
        result = result.filter((p) => p.price <= Number(activeFilters.priceTo))
      }
      if (activeFilters.types.length > 0) {
        result = result.filter((p) => activeFilters.types.includes(p.type))
      }
      if (activeFilters.colors.length > 0) {
        result = result.filter((p) => activeFilters.colors.includes(p.color))
      }
    }

    result.sort((a, b) => {
      switch (sort) {
        case 'cheap':
          return a.price - b.price
        case 'expensive':
          return b.price - a.price
        case 'popular':
          return b.rating - a.rating
        case 'new': {
          const aIsNew = a.labels?.includes('Новинка') ? 1 : 0
          const bIsNew = b.labels?.includes('Новинка') ? 1 : 0
          return bIsNew - aIsNew
        }
        default:
          return 0
      }
    })

    return result
  }, [products, activeFilters, sort])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredAndSortedProducts, currentPage])

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE,
  )

  return {
    isLoading,
    paginatedProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    sort,
    setSort,
    setActiveFilters,
  }
}
