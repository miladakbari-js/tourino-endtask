import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { fetchTours } from "@/services/accessTours";
import AllTours from "@/components/templates/AllTours";
import { withAuth } from "@/utils/withAuth";

function index() {
  const {
    data: tours,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  if (isLoading) return <h1>در حال بارگذاری...</h1>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <>
      <AllTours tours={tours} />
    </>
  );
}

export default index;



export const getServerSideProps = withAuth(async (context) => {
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
});
