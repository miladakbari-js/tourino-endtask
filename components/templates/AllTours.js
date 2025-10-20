import toast from "react-hot-toast";
import styles from "../../styles/AllTours.module.css";
import ToursCard from "../modules/tours/ToursCard";
import { useEffect } from "react";

function AllTours({ tours }) {
  if (!tours || tours.length === 0) {
    useEffect(() => toast.error("نتیجه‌ای یافت نشد!"), []);
    return null;
  }
  return (
    <div className={styles.container}>
      {tours.map((tour) => (
        <ToursCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}

export default AllTours;
