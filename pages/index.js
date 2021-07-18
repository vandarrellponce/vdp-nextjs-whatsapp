import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Whatsapp VDP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>this is welcome from mars</h1>
    </div>
  )
}
