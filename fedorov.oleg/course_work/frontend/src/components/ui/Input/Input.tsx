import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', disabled, ...props }, ref) => {
    const wrapperClasses = [
      styles.wrapper,
      error ? styles.hasError : '',
      disabled ? styles.disabled : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={wrapperClasses}>
        {label && <label className={styles.label}>{label}</label>}

        <input
          ref={ref}
          className={styles.input}
          disabled={disabled}
          {...props}
        />

        {error && <span className={styles.errorText}>{error}</span>}
        {!error && helperText && (
          <span className={styles.helperText}>{helperText}</span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
