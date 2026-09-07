import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '@store/useAuthStore'
import { useCartStore } from '@store/useCartStore'
import { Button } from '@components/ui/Button/Button'
import styles from './Header.module.scss'
import cartIcon from '@assets/images/icons/cart.png'

export const Header = () => {
  const { isAuthenticated, logout } = useAuthStore()
  const totalItems = useCartStore((state) => state.getTotalCount())

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Gadget Hub
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Каталог
          </NavLink>

          {isAuthenticated ? (
            <div className={styles.userActions}>
              <NavLink to="/cart" className={styles.cartLink}>
                <img src={cartIcon} alt="Корзина" />
                {totalItems > 0 && (
                  <span className={styles.badge}>{totalItems}</span>
                )}
              </NavLink>
              <Button onClick={logout} variant="blue">
                Выйти
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="blue">Войти</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
