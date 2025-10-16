import { formatPersianDateTime } from "@/utils/helpers";
import styles from "./TransectionsCard.module.css"

function TransectionsCard({data}) {
   console.log(data.userId);

   const numericId = data.userId.split("-").join("").replace(/\D/g, "").slice(0, 9);


  return (
    <div className={styles.container}>
        <div className={styles.box}>{formatPersianDateTime(data.createdAt)}</div>
        <div className={styles.box} ><p>{data.amount.toLocaleString()}</p></div>
        <div className={`${styles.box} ${styles.type}`}>{data.type === "Purchase" ? " ثبت نام در تور گردشگری" : "سایر روش ها"}</div>
        <div className={styles.box}>{`سفارش ${numericId}`}</div>
    </div>
  )
}

export default TransectionsCard