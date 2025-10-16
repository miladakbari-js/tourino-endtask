"use client";
import { useQuery } from "@tanstack/react-query";
import MyToursCard from "@/components/modules/tours/MyToursCard";
import { getMyTours } from "@/services/auth";
import { ClipLoader } from "react-spinners";
import styles from "@/styles/mytours.module.css"

function MyTours({ initialTours }) {
  const { data: tours, isLoading } = useQuery({
    queryKey: ["my-tours"],
    queryFn: getMyTours,
    initialData: initialTours,
  });

 

  if (isLoading) return <ClipLoader />;

  return (
    <div className={styles.container}>
      {tours.map((tour) => (
        <MyToursCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}

export default MyTours;

export async function getServerSideProps() {
  try {
    const toursData = await getMyTours();

    return {
      props: {
        initialTours: toursData || [],
      },
    };
  } catch (error) {
    console.log("Error fetching tours:", error.message);
    return {
      props: {
        initialTours: [],
      },
    };
  }
}
