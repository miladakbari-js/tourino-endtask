import Image from "next/image";
import styles from "./MyToursCard.module.css";
import {
  convertCityName,
  convertVehicle,
  endDateFaLong,
  startDateFaLong,
} from "@/utils/helpers";

function MyToursCard({ tour }) {
  const vehicleSrc = () => {
    if (tour.fleetVehicle === "bus") {
      return "/bus.svg";
    } else if (tour.fleetVehicle === "ship") {
      return "/ship.svg";
    } else if (tour.fleetVehicle === "train") {
      return "/train.png";
    } else if (tour.fleetVehicle === "airplane") {
      return "/airplane.svg";
    } else if (tour.fleetVehicle === "SUV") {
      return "/bus.svg";
    }
  };

  const tourStatus = () => {
    const now = new Date().getTime();
    const start = new Date(tour.startDate).getTime();
    const end = new Date(tour.endDate).getTime();

    let status = "";
    if (end < now) status = "به اتمام رسیده";
    else if (start <= now && end >= now) status = "در حال برگزاری";
    else status = "در انتظار شروع";

    return status;
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div>
          <Image src="/sun-fog.svg" width={24} height={24} />
          <p>{tour.title}</p>
        </div>

        <div>
          <Image src={vehicleSrc()} width={24} height={24} />
          <p>{`سفر با ${convertVehicle(tour.fleetVehicle)}`}</p>
        </div>
        <span className={tourStatus()==="در حال برگزاری" ? styles.nowTheme : styles.endTheme}>{tourStatus()}</span>
      </div>
      <div className={styles.middle}>
        <div  className={styles.box}>
          <p>{`${convertCityName(tour.origin.name)} به ${convertCityName(
            tour.destination.name
          )} .`}</p>
          <span>{startDateFaLong(tour?.startDate)}</span>
        </div>
        <div className={styles.box}>
          <p>تاریخ برگشت . </p>
          <span>{endDateFaLong(tour?.endDate)}</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.bottom}>
        <div className={styles.box}>
          <span>شماره تور </span>
          <p>{tour.id.split("-")[4].slice(0 , 8)}</p>
        </div>
        <div className={styles.box}>
          <span>مبلغ پرداخت شده</span>
          <p>
            {tour.price.toLocaleString()}
            <span>تومان</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyToursCard;
