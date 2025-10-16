import TransectionsCard from "@/components/modules/transections/TransectionsCard";
import { getTransactions } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/Transections.module.css";

function Transactions() {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div>
          <p>تاریخ و ساعت</p>
        </div>
        <div>
          <p>مبلغ (تومان)</p>
        </div>
        <div className={styles.type}>
          <p>نوع تراکنش</p>
        </div>
        <div>
          <p>شماره سفارش</p>
        </div>
      </div>
      <div className={styles.body}>
        {transactions?.map((item, index) => (
          <TransectionsCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Transactions;
