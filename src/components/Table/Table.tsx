import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Product, ProductsResponse } from "./types"
import styles from './styles.module.css'
import { formatNumber } from "../../util/functions"
import TableHeader from "../TableHeader/TableHeader"
import TablePagination from "../TablePagination/TablePagination"

type TProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const Table = ({setIsModalOpen}: TProps) => {
  const [tableData, setTableData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Запрос данных с сервера
  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=10&skip=10')
      const data: ProductsResponse = await response.json()
      setTableData(data.products)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Получение ячейки с названием и изображением товара
  const getTitleTd = (item: Product) => (
    <td>
      <div className={styles.titleTd}>
        <img src={item.images[0]} alt={item.title} className={styles.img} />
        <div className={styles.titleCategory}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.category}>{item.category}</div>
        </div>
      </div>
    </td>
  )

  // Получение ячейки с кнопками
  const getButtonsTd = () => (
    <td>
      <div className={styles.buttons}>
        <button className={styles.add}>+</button>
        <div className={styles.more}>
          <span className="material-symbols-outlined">more_horiz</span>
        </div>
      </div>
    </td>
  )

  // Получение ячейки с рейтингом
  const getRatingTd = (rating: number) => (
    <td className={styles.td}>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div style={{...(rating<3 && {color: "#F11010"})}}>{rating}</div>/5
      </div>
    </td>
  )

  // Получение ячейки с ценой
  const getPriceTd = (price: number) => {
    const priceArr = formatNumber(price).split(',')
    return (
      <td className={styles.td}>
        <div style={{display: "flex", justifyContent: "center", fontFamily: "'Roboto Mono', monospace"}}>
          {priceArr[0]}<div style={{color: "#C7C7CC"}}>,{priceArr[1]}</div>
        </div>
      </td>
    )
  }

  // Отображение таблицы
  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>
  return (
    <div className={styles.content}>
      <TableHeader setIsModalOpen={setIsModalOpen} />

      <table className={styles.table}>
        <thead>
          <tr className={styles.trh}>
            <th className={styles.checkbox}>
              <input type="checkbox" name="selectAll" value="selectAll" />
            </th>
            <th className={styles.titleTh}>Наименование</th>
            <th>Вендор</th>
            <th>Артикул</th>
            <th>Оценка</th>
            <th>Цена</th>
            <th>Количество</th>
            <th style={{width: 133}} />
          </tr>
        </thead>

        <tbody>
          {tableData.map((item) => (
            <tr key={item.id} className={styles.tr}>
              <td className={styles.td}>
                <input
                  type="checkbox"
                  name={`select-${item.id}`}
                  value={`select-${item.id}`}
                />
              </td>
              
              {getTitleTd(item)}

              <td className={styles.td}>
                {item?.brand}
              </td>

              <td className={styles.td}>
                {item.sku}
              </td>

              {getRatingTd(item.rating)}

              {getPriceTd(item.price)}

              <td className={styles.td}>
                {item.minimumOrderQuantity}
              </td>

              {getButtonsTd()}
            </tr>
          ))}
        </tbody>
      </table>

      <TablePagination />
    </div>
  )
}

export default Table
