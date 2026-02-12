import { CSSProperties, Dispatch, SetStateAction, useState } from 'react'
import styles from './styles.module.css'
import { TSort } from '../Table/Table';

type TProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  fetchData: (sort: TSort) => void;
}

// Заголовок таблицы
const TableHeader = ({setIsModalOpen, fetchData}: TProps) => {
  const [sortType, setSortType] = useState<TSort>(localStorage.getItem("sort") as TSort)

  // Обработчик клика по кнопке сортировки (сортировка происходит по цене)
  const handleSort = () => {
    let s = sortType

    if (sortType === '') {
      s = 'desc'
      setSortType('desc')
    } else if (sortType === 'desc') {
      s = 'asc'
      setSortType('asc')
    } else {
      s = ''
      setSortType('')
    }

    localStorage.setItem("sort", s)
    fetchData(s)
  }

  // Стилизация кнопки сортировки
  let filterBtnStyle: CSSProperties = {
    color: sortType !== '' ? 'black' : '#CFCFCF',
    border: sortType !== '' ? '1px solid black' : '1px solid #E2E2E2'
  }
  if (sortType === 'asc') filterBtnStyle = {...filterBtnStyle, transform: "rotate(180deg)"}

  return (
    <div className={styles.headHolder}>
      <h3>Все позиции</h3>
      <div className={styles.buttons}>
        <span className={`material-symbols-outlined ${styles.btn}`}>cached</span>

        <span
          className={`material-symbols-outlined ${styles.btn}`}
          style={filterBtnStyle}
          onClick={handleSort}
        >
          filter_list
        </span>

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
