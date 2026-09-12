import { ProductCard } from '@components/ProductCard/ProductCard'
import { CatalogFilter } from './components/CatalogFilter/CatalogFilter'
import { CatalogSort } from './components/CatalogSort/CatalogSort'
import { useCatalog } from '@hooks/useCatalog'
import styles from './Catalog.module.scss'
import { Loader, Pagination } from '@/components/ui'
import { Product } from '@/types'
import { useState } from 'react'
import { ProductModal } from '@/components'

export const Catalog = () => {
  const {
    isLoading,
    paginatedProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    sort,
    setSort,
    setActiveFilters,
  } = useCatalog()

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className={styles.catalogPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Каталог товаров</h1>

        <div className={styles.layout}>
          <CatalogFilter
            onApply={(f) => {
              setActiveFilters(f)
              setCurrentPage(1)
            }}
            onReset={() => {
              setActiveFilters(null)
              setCurrentPage(1)
            }}
          />

          <div className={styles.mainContent}>
            <CatalogSort
              currentSort={sort}
              onSortChange={(s) => {
                setSort(s)
                setCurrentPage(1)
              }}
            />

            {isLoading ? (
              <Loader size="large" />
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className={styles.grid}>
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onCardClick={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className={styles.paginationWrapper}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className={styles.emptyState}>
                Товары по вашему запросу не найдены
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
