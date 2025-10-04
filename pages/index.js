import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchTours } from "@/services/accessTours";
import SearchBox from "@/components/modules/search/SearchBox";
import AllTours from "@/components/templates/AllTours";
import TellBanner from "@/components/templates/TellBanner";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data: tours, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  return (
    <main className={styles.container}>
      <img src="./banner.svg" alt="banner_image" className={styles.banner} />
      <p className={styles.banner_text}>
        <span>تورینو</span> برگزار کننده بهترین تور های داخلی و خارجی
      </p>
      {isLoading ? (
        <p>در حال بارگذاری ...</p>
      ) : (
        <div className={styles.components}>
          <SearchBox tours={tours} />
          <AllTours tours={tours} />
          <TellBanner/>
        </div>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["tours"], queryFn: fetchTours });
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}
