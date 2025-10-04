import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchTours } from "@/services/accessTours";
import AllTours from "@/components/templates/AllTours";

function index() {
  const {
    data: tours,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <>
      <AllTours tours={tours} />
    </>
  );
}

export default index;

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
