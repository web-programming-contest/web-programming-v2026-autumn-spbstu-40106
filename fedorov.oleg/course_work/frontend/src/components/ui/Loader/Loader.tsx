import styles from './Loader.module.scss'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  fullScreen?: boolean
}

export const Loader = ({
  size = 'medium',
  fullScreen = false,
}: LoaderProps) => {
  return (
    <div
      className={[
        styles.wrapper,
        styles[size],
        fullScreen ? styles.fullScreen : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.spinner} />
    </div>
  )
}
