import { useEffect, useState } from 'react'
import { api } from '@api/index'
import { Product, PromoProduct } from '@/types'
import { ProductSlider } from '@components/ProductSlider/ProductSlider'
import { ProductModal } from '@components/ProductModal/ProductModal'
import styles from './Home.module.scss'
import { formatPrice } from '@/utils/format'

export const Home = () => {
  const [promo, setPromo] = useState<PromoProduct | null>(null)
  const [hits, setHits] = useState<Product[]>([])
  const [news, setNews] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [promoRes, goodsRes] = await Promise.all([
          api.getPromo().catch(() => ({ data: null })),
          api.getGoods(),
        ])

        if (promoRes.data) {
          setPromo(promoRes.data)
        } else if (goodsRes.data.length > 0) {
          setPromo(goodsRes.data[0])
        }

        setHits(goodsRes.data.filter((p) => p.rating >= 4.5))
        setNews(goodsRes.data.filter((p) => p.labels?.includes('Новинка')))
      } catch (error) {
        console.error('Ошибка загрузки главной страницы', error)
      }
    }
    fetchHomeData()
  }, [])

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        {promo && (
          <div
            className={styles.promoBanner}
            onClick={() => setSelectedProduct(promo)}
          >
            <div className={styles.promoContent}>
              {promo.discount && (
                <span className={styles.saleBadge}>{promo.discount}</span>
              )}
              <h1 className={styles.promoTitle}>{promo.title}</h1>
              <div className={styles.prices}>
                {promo.oldPrice && (
                  <span className={styles.oldPrice}>
                    {formatPrice(promo.oldPrice)} ₽
                  </span>
                )}
                <span className={styles.newPrice}>
                  {formatPrice(promo.price)} ₽
                </span>
              </div>
            </div>
            <img
              src={promo.image}
              alt={promo.title}
              className={styles.promoImage}
            />
          </div>
        )}

        <ProductSlider
          title="Хиты продаж"
          subtitle="Тысячи покупателей уже одобрили эти товары..."
          products={hits}
          onCardClick={(p) => setSelectedProduct(p)}
        />

        <ProductSlider
          title="Новинки"
          subtitle="Их только произвели — и они уже у нас!..."
          products={news}
          onCardClick={(p) => setSelectedProduct(p)}
        />

        <div className={styles.advantages}>
          <div className={styles.advItem}>
            <h3>Утром заказали, вечером получили</h3>
          </div>
          <div className={styles.advItem}>
            <h3>С товаром что-то не так? Вернем деньги</h3>
          </div>
          <div className={styles.advItem}>
            <h3>Только оригинальные товары</h3>
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
