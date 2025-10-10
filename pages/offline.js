import styles from "@/styles/Offline.module.css"
import Image from "next/image"

function Offline() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <h2>اتصال با سرور برقرار نیست!</h2>
        <p>لطفا بعدا دوباره امتحان کنید.</p>
      </div>
      <Image src="/error_lamp.svg" width={560} height={560}/>
    </div>
  )
}

export default Offline