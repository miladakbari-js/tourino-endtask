import styles from "../../styles/AllTours.module.css"
import ToursCard from '../modules/tours/ToursCard'

function AllTours({tours}) {
  return (
    <div className={styles.container}>
        {tours.map(tour=><ToursCard key={tour.id} tour={tour}/>)}
    </div>
  )
}

export default AllTours