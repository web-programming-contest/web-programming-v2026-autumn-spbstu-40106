import { Modal } from '@components/ui/Modal/Modal'
import { Button } from '@components/ui/Button/Button'
import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onClose: () => void
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <Button variant="pink" onClick={onConfirm}>
            Да, удалить
          </Button>
          <Button variant="blue" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  )
}
