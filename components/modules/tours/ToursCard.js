import { putBasket } from "@/services/auth";
import styles from "../../../styles/ToursCard.module.css";
import { convertVehicle } from "@/utils/helpers";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function ToursCard({ tour }) {
  const { options, startDate, endDate, title, image, fleetVehicle, price, id } =
    tour;

  const text = options[1].slice(0, 9);
  const month = new Date(endDate).toLocaleDateString("fa-IR", {
    month: "long",
  });

  const diffTime = new Date(endDate) - new Date(startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const router = useRouter();

  const handleAddToBasket = async () => {
    try {
      await putBasket(id);
      toast.success("تور با موفقیت به سبد خرید اضافه شد ");
      router.push("/basket")
    } catch (err) {
      const msg = err.response?.data?.message || "خطا در افزودن تور";
      toast.error(msg);
    }
  };

  return (
    <div className={styles.container}>
      <img src={image} alt="tour_image" />
      <div className={styles.down}>
        <Link href={`/tours/${id}`}>
          <h3>{title}</h3>
        </Link>
        <div className={styles.desc}>
          <p>{month} ماه -</p>
          <p>{diffDays} روزه -</p>
          <p>{convertVehicle(fleetVehicle)} - </p>
          <p>{text}...</p>
        </div>
        <div className={styles.price}>
          <button onClick={() => handleAddToBasket(id)}>رزرو</button>
          <p>
            {" "}
            <span>{price} </span> تومان
          </p>
        </div>
      </div>
    </div>
  );
}

export default ToursCard;
