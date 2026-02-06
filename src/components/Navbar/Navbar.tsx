import NotifCountHolder from '../NotifCountHolder/NotifCountHolder'
import Search from '../Search/Search'
import styles from './styles.module.css'

const Navbar = () => {
  const iconStyle = `material-symbols-outlined ${styles.menuIcon}`
  return (
    <div className={`${styles.nav}`}>
      <h3>Товары</h3>
      <div className={`${styles.menu}`}>
        {/* Поле поиска */}
        <Search />

        {/* Дивайдер */}
        <div className={`${styles.divider}`}/>

        {/* Иконки */}
        <div className={`${styles.menuIcons}`}>
          <span className={iconStyle}>language</span>
          <NotifCountHolder count={12}>
            <span className={iconStyle}>notifications</span>
          </NotifCountHolder>
          <span className={iconStyle}>mail</span>
          <span className={iconStyle} style={{transform: "rotate(90deg)"}}>tune</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
