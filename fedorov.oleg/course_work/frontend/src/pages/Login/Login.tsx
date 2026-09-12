import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/useAuthStore'
import { api } from '@api/index'
import styles from './Login.module.scss'
import { Button, Input } from '@/components/ui'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ username: '', password: '' })
  const [serverError, setServerError] = useState('')

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ username: '', password: '' })
    setServerError('')

    let hasError = false
    if (!username.trim()) {
      setErrors((prev) => ({
        ...prev,
        username: 'Заполните обязательное поле',
      }))
      hasError = true
    }
    if (!password.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: 'Заполните обязательное поле',
      }))
      hasError = true
    }

    if (hasError) return

    try {
      const { data } = await api.login(username, password)
      login(data.username, data.accessToken, data.refreshToken)
      navigate('/')
    } catch {
      setServerError(
        'Такого пользователя нет, возможно неправильный логин или пароль – проверьте данные',
      )
    }
  }

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Добро пожаловать!</h1>

        {serverError && <div className={styles.serverError}>{serverError}</div>}

        <Input
          label="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
        />
        <Input
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <Button type="submit" variant="blue">
          Войти
        </Button>
      </form>
    </div>
  )
}
