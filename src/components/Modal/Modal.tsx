import { useState } from 'react'
import styles from './styles.module.css'

type TProps = {
  isOpen: boolean,
  onClose: () => void,
}

const Modal = ({ isOpen, onClose }: TProps) => {
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [price, setPrice] = useState('')

  if (!isOpen) return null;

  const handleSubmit = () => {
    setCategory('')
    setName('')
    setManufacturer('')
    setPrice('')

    onClose()
  }

  return (
    <div className={styles.modalUnderlay}>
      <div className={styles.modal}>
        <h3>Добавить товар</h3>

        <div className={styles.form}>
          <div className={styles.inputHodler}>
            <label>Категория</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputHodler}>
            <label>Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputHodler}>
            <label>Производитель</label>
            <input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.inputHodler}>
            <label>Цена</label>
            <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.input}
              />
          </div>

          <div className={styles.buttonHodler} style={{marginTop: 20}}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Отмена
            </button>
            <button onClick={handleSubmit} className={styles.add}>
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
