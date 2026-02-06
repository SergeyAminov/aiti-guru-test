import { memo } from 'react';
import styles from './styles.module.css'

type TProps = {
  // Иконка
  children: React.ReactNode;
  // Счетчик
  count: number;
}

// Компонент обертка для иконок в навбаре, которые могут содержать счетчик
const NotifCountHolder = ({children, count}: TProps) => {
  return (
    <div className={styles.notifCountHolder}>
      {children}
      {count > 0 && (
        <span className={styles.notifBadge}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  )
}

export default memo(NotifCountHolder)
