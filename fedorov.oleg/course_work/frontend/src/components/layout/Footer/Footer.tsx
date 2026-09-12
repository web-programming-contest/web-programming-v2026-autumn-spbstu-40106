import styles from './Footer.module.scss'
import vkIcon from '@assets/images/social_icons/vk.png'
import tgIcon from '@assets/images/social_icons/telegram.png'
import waIcon from '@assets/images/social_icons/whatsapp.png'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logo}>Gadget Hub</div>
          <p className={styles.slogan}>Магазин надежных гаджетов</p>
          <p className={styles.copyright}>
            © 2024 ООО "Гаджет Хаб". Все права защищены
          </p>
        </div>

        <div className={styles.contacts}>
          <a href="mailto:gadget@hub.ru">gadget@hub.ru</a>
          <p>Санкт-Петербург, ул. Барочная, д.7, корпус 2</p>
          <a href="tel:88006783424" className={styles.phone}>
            8 (800) 678-34-24
          </a>

          <div className={styles.socials}>
            <a href="https://vk.com" target="_blank" rel="noreferrer">
              <img src={vkIcon} alt="VK" />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer">
              <img src={tgIcon} alt="Telegram" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
              <img src={waIcon} alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
