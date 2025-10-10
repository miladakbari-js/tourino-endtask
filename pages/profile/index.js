import { getProfile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/ProfileDetails.module.css";
import { useState } from "react";
import { AccountInfo } from "@/components/modules/profile/AccountInfo";
import { PersonalInfo } from "@/components/modules/profile/PersonalInfo";
import { BanklInfo } from "@/components/modules/profile/BankInfo";

function ProfileDetials() {
  const [editEmail, setEditEmail] = useState(true);
  const [editPersonal, setEditPersonal] = useState(true);
  const [editBank, setEditBank] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) return <p>لطفا صبر کنید ...</p>;
  if (isError) return <p>خطا...</p>;
  return (
    <div className={styles.container}>
      <div className={styles.accunt_info}>
        <AccountInfo
          data={data}
          editEmail={editEmail}
          setEditEmail={setEditEmail}
        />
      </div>
      <div className={styles.personal_info}>
        <PersonalInfo
          data={data}
          editPersonal={editPersonal}
          setEditPersonal={setEditPersonal}
        />
      </div>
      <div className={styles.bank_info}>
        <BanklInfo data={data} editBank={editBank} setEditBank={setEditBank} />
      </div>
    </div>
  );
}

export default ProfileDetials;





