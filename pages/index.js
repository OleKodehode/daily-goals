import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import DailyToDo from '@/components/DailyToDoList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <main className={styles['main-container']}>
      <h1 className={styles['main-title']}>
        My Daily Goals
      </h1>
      <div className={styles['daily-todo']}>
        <DailyToDo />
      </div>
    </main>
    </>
  )
}