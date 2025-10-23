
export function withAuth(page) {
  return async (context) => {
    const cookies = context.req.headers.cookie || "";
    const hasToken = cookies.includes("accessToken=");
    if (!hasToken) {
      
      return {
        redirect: { destination: "/", permanent: false },
      };
    }
    return page ? await page(context) : { props: {} };
  };
}