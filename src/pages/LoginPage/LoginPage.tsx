import { Dispatch, SetStateAction, useState } from 'react'
import styles from './styles.module.css'
import { User } from './types'

type TProps = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>,
}

const LoginPage = ({setLoggedIn}: TProps) => {
  const [username, setUsername] = useState<string>("")
  const [showErrEmail, setShowErrEmail] = useState<boolean>()

  const [password, setPassword] = useState<string>("")
  const [showPass, setShowPass] = useState<boolean>(false)
  const [showErrPass, setShowErrPass] = useState<boolean>()

  const [checked, setChecked] = useState<boolean>(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Запрос данных с сервера
  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
      })

      const data: User | {message: string} = await response.json()

      if (response.ok && 'accessToken' in data) {
        // Сохраняем токен в зависимости от чекбокса
        if (checked) {
          localStorage.setItem('authToken', data.accessToken)
          sessionStorage.removeItem('authToken')
        } else {
          sessionStorage.setItem('authToken', data.accessToken)
          localStorage.removeItem('authToken')
        }

        // Обновление состояния для открытия страницы с таблицей
        setLoggedIn(true)
      }
      
      else {
        setError((data as { message?: string }).message || 'Неверные учетные данные')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false);
    }
  }

  // Обработка нажатия на кнопку "Войти"
  const handleLogin = () => {
    setError(null)

    // Валидация полей
    let isReturn = false
    if (username === "") {
      setShowErrEmail(true)
      isReturn = true
    }
    if (password === "") {
      setShowErrPass(true)
      isReturn = true
    }
    if (isReturn) return
    
    fetchData()
  }

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showErrEmail) setShowErrEmail(false)
    if (error) setError(null)
    setUsername(e.target.value)
  }
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showErrPass) setShowErrPass(false)
    if (error) setError(null)
    setPassword(e.target.value)
  }

  return (
    <div className={styles.underlay}>
      <div className={styles.gradientBorder}>
        <div className={styles.formHolder}>
          <span className="material-symbols-outlined" style={{fontSize: 52}}>
            account_circle
          </span>

          <h3 style={{fontSize: 40}}>Добро пожаловать</h3>
          <p style={{color: "#CFCFCF"}}>Пожалуйста, авторизуйтесь</p>

          <div className={styles.formInput}>
            <label htmlFor="username">Почта</label>

            <div className={styles.inputHolder}>
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>mail</span>

              <input
                id="username"
                type="text"
                className={styles.input}
                placeholder="test@mail.com"
                value={username}
                onChange={handleUsername}
              />

              <span
                className={`material-symbols-outlined ${styles.inputIconSecondary}`}
                onClick={() => setUsername("")}
              >
                close
              </span>
            </div>
            {showErrEmail && (<div className={styles.errMsg}>Заполните поле</div>)}
          </div>

          <div className={styles.formInput}>
            <label htmlFor="pass">Пароль</label>
            <div className={styles.inputHolder}>
              <span className={`material-symbols-outlined ${styles.inputIcon}`}>lock</span>
              <input
                id="pass"
                type={showPass ? "text" : "password"}
                className={styles.input}
                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                value={password}
                onChange={handlePassword}
              />
              <span
                className={`material-symbols-outlined ${styles.inputIconSecondary}`}
                onClick={() => setShowPass(prev => !prev)}
              >
                {showPass ? "visibility_off" : "visibility"}
              </span>
            </div>
            {showErrPass && (<div className={styles.errMsg}>Заполните поле</div>)}
          </div>

          <div className={styles.rememberHolder}>
            <input type="checkbox" id="remember" checked={checked} onChange={() => setChecked(prev => !prev)} />
            <label htmlFor="remember" style={{fontSize: 16, color: "#CFCFCF"}}>Запомнить данные</label>
          </div>

          {error && (<div className={styles.errMsg}>Ошибка: {error}</div>)}
          {loading && (<p>Загрузка...</p>)}
          {!loading && (<button className={styles.loginButton} onClick={handleLogin}>Войти</button>)}

          <div className={styles.separator}>
            <div className={styles.vector} />
            или
            <div className={styles.vector} />
          </div>

          <div className={styles.createHolder}>
            Нет аккаунта?
            <button className={styles.create}>Создать</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
