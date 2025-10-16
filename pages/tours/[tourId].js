import { fetchToursById } from "@/services/accessTours";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import styles from "../../styles/ToursDetail.module.css";
import {
  convertCityName,
  convertVehicle,
  endDateFa,
  startDateFa,
} from "@/utils/helpers";
import { putBasket } from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function details({ tourId }) {
  const {
    data: tours,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => fetchToursById(tourId),
  });
 
  const router = useRouter();

  const diffTime = new Date(tours?.endDate) - new Date(tours?.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  const shoppingHandler =async (tourId)=>{
   try {
    const data = await putBasket(tourId);
    toast.success(data.message)
    router.push("/basket")
   } catch (err) {
    toast.error("خطا در عملیات رزرواسیون")
   }
   
   
  }
  return (
    <div className={styles.details_body}>
      <div className={styles.container}>
        <div className={styles.up}>
          <img src={tours?.image} />
          <div className={styles.side}>
            <div className={styles.name}>
              <div className={styles.title}>
                <h4>{tours?.title}</h4>
                <p>
                  {diffDays} روز و {diffDays + 1} شب
                </p>
              </div>
              <div className={styles.tourlider}>
                <div>
                  <img
                    src="/tourlider.svg"
                    alt="tourlider_icon"
                    className={styles.icon}
                  />
                  <span>تورلیدر از مبدا</span>
                </div>
                <div>
                  <img src="/map.svg" alt="map_icon" className={styles.icon} />
                  <span> برنامه سفر </span>
                </div>
                <div>
                  <img
                    src="/medal.svg"
                    alt="medal_icon"
                    className={styles.icon}
                  />
                  <span>تضمین کیفیت</span>
                </div>
              </div>
            </div>
            <div className={styles.price}>
              <p style={{ color: "#009eca" }}>
                {tours?.price} <span>تومان</span>
              </p>

              <button onClick={()=>shoppingHandler(tourId)}>رزرو و خرید</button>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            <div>
              <img src="/start.svg" />
              <span>مبدا</span>
            </div>
            <p>{convertCityName(tours?.origin.name)}</p>
          </div>
          <div className={styles.info}>
            <div>
              <img src="/calendar.svg" />
              <span>تاریخ رفت</span>
            </div>
            <p>{startDateFa(tours?.startDate)}</p>
          </div>
          <div className={styles.info}>
            <div>
              <img src="/calendar.svg" />
              <span>تاریخ برگشت</span>
            </div>
            <p>{endDateFa(tours?.endDate)}</p>
          </div>
          <div className={styles.info}>
            <div>
              <img src="/bus.svg" />
              <span>حمل و نقل</span>
            </div>
            <p>{convertVehicle(tours?.fleetVehicle)}</p>
          </div>
          <div className={styles.info}>
            <div>
              <img src="/profile-2user.svg" />
              <span>ظرفیت</span>
            </div>
            <p>{tours?.capacity} نفر</p>
          </div>
          <div className={styles.info_end}>
            <div>
              <img src="/security.svg" />
              <span>بیمه</span>
            </div>
            <p>{tours?.insurance ? "دارد" : "فاقد بیمه"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default details;

export async function getServerSideProps(context) {
  const { tourId } = context.params;
  console.log(tourId);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tour", tourId],
    queryFn: () => fetchToursById(tourId),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      tourId,
    },
  };
}
