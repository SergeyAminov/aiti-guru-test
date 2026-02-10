import styles from './styles.module.css'

// Пагинация таблицы
const TablePagination = () => {

  const current = <div style={{color: "black"}}>1-20</div>
  const all = <div style={{color: "black"}}>120</div>

  return (
    <div className={styles.pagination}>
      <div style={{display: "flex", color: "#CFCFCF"}}>Показано &nbsp; {current} &nbsp; из &nbsp; {all}</div>

      <div className={styles.buttons}>
        <span className="material-symbols-outlined" style={{color: "#CFCFCF", marginRight: 8, cursor: "pointer"}}>keyboard_arrow_left</span>
        <button className={`${styles.btn} ${styles.current}`}>1</button>
        <button className={styles.btn}>2</button>
        <button className={styles.btn}>3</button>
        <button className={styles.btn}>4</button>
        <button className={styles.btn}>5</button>
        <span className="material-symbols-outlined" style={{color: "#CFCFCF", marginLeft: 8, cursor: "pointer"}}>keyboard_arrow_right</span>
      </div>
    </div>
  )
}

export default TablePagination
