import toast from "react-hot-toast"
import styles from "../../styles/AllTours.module.css"
import ToursCard from '../modules/tours/ToursCard'

function AllTours({tours}) {
  if (!tours || tours.length === 0)
    return toast.error("نتیجه ای یافت نشد!")
  return (
    <div className={styles.container}>
        {tours.map(tour=><ToursCard key={tour.id} tour={tour}/>)}
    </div>
  )
}

export default AllTours