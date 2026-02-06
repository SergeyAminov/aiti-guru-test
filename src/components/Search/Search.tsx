import styles from './styles.module.css'

// Поле "Найти" на навбаре
const Search = () => {
  return (
    <div className={`${styles.searchHolder}`}>
      <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
      <input type="text" className={`${styles.searchInput}`} placeholder="Найти" />
    </div>
  )
}

export default Search
