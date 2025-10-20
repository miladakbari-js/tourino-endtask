import { dehydrate,  QueryClient, useQuery } from "@tanstack/react-query";
import { fetchTours } from "@/services/accessTours";
import SearchBox from "@/components/modules/search/SearchBox";
import AllTours from "@/components/templates/AllTours";
import TellBanner from "@/components/templates/TellBanner";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import WhyTourino from "@/components/templates/WhyTourino";
import Charter from "@/components/templates/Charter";

import { useRouter } from "next/router";

export default function Home() {
  const [searchTours , setSearchTours] = useState(null)
const router = useRouter()

  const { data: tours, isLoading , isError } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

   useEffect(() => {
    if (isError) {
      router.push("/offline");
    }
  }, [isError]);

  if (isError) return <p>در حال ارتباط . .</p>
 
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
          <SearchBox tours={tours} setSearchTours={setSearchTours}/>
          <AllTours tours={searchTours ?? tours} />
          <TellBanner/>
          <WhyTourino/>
          <Charter/>
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
