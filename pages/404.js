import styles from "@/styles/PageNotFound.module.css"
import Image from "next/image"
import Link from "next/link"

function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <h2>صفحه موردنظر یافت نشد!</h2>
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </div>
      <Image src="/error_tv.svg" width={560} height={560}/>
    </div>
  )
}

export default PageNotFound