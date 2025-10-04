import styles from "../../../styles/ToursCard.module.css";
import { convertVehicle } from "@/utils/helpers";
import Link from "next/link";

function ToursCard({ tour }) {
  const { options, startDate, endDate, title, image, fleetVehicle, price , id } =
    tour;
  const text = options[1].slice(0, 9);
  const month = new Date(endDate).toLocaleDateString("fa-IR", {
    month: "long",
  });
  const diffTime = new Date(endDate) - new Date(startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <Link href={`/tours/${id}`}>
    <div className={styles.container}>
      <img src={image} alt="tour_image" />
      <div className={styles.down}>
        <h3>{title}</h3>
        <div className={styles.desc}>
          <p>{month} ماه -</p>
          <p>{diffDays} روزه -</p>
          <p>{convertVehicle(fleetVehicle)} - </p>
          <p>{text}...</p>
        </div>
        <div className={styles.price}>
          <Link href="/">رزرو</Link>
          <p>
            {" "}
            <span>{price} </span> تومان
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ToursCard;
