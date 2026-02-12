import { Dispatch, SetStateAction } from 'react'
import styles from './styles.module.css'

type TProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

// Заголовок таблицы
const TableHeader = ({setIsModalOpen}: TProps) => {
  return (
    <div className={styles.headHolder}>
      <h3>Все позиции</h3>
      <div className={styles.buttons}>
        <span className={`material-symbols-outlined ${styles.btn}`}>cached</span>
        <span className={`material-symbols-outlined ${styles.btn}`}>filter_list</span>
        <button className={styles.add} onClick={() => setIsModalOpen(true)}>
          <span className="material-symbols-outlined">
            add_circle
          </span>
          Добавить
        </button>
      </div>
    </div>
  )
}

export default TableHeader
