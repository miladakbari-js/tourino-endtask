import Basket from "@/components/modules/basket/Basket";
import TravellerForm from "@/components/modules/basket/TravellerForm";
import styles from "@/styles/BasketPage.module.css";
import { useState } from "react";

function BasketPage() {
   const [travellerData, setTravellerData] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <TravellerForm setTravellerData={setTravellerData} />
      </div>

      <div className={styles.left}>
        <Basket travellerData={travellerData}/>
      </div>
    </div>
  );
}

export default BasketPage;
