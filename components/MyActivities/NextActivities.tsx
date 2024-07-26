import React, { useEffect, useState } from 'react';
import ActivitiesCard from './ActivitiesCard';

import styles from './NextActivities.module.css';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

export interface propNextActivity {
  activities?: any;
  getVoucher?: any;
  cancelReservation?: any;
  setModalShow?: any;
  setReservation?: any;
  title:any;
}

const NextActivities: React.FC<propNextActivity> = ({
  activities,
  getVoucher,
  cancelReservation,
  setModalShow,
  setReservation,
  title,
}: propNextActivity) => {
  const [dateNow, setDateNow] = useState<any>();
  const [seeMore, setSeeMore] = useState<any>(5);
  
  
  const [dic, setDic] = useState<any>(null);
  const searchParams = useParams();

  useEffect(() => {
    const fetchDictionary = async () => {
        const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'myActivities');
        setDic(dictionary);
    };

    fetchDictionary();

}, [searchParams.lng])

  useEffect(() => {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

   setDateNow(`${year}${month}${day}`);
   //setDateNow(20230410)
  }, []);
  const fixDate = (data: any) => {
    var aux = data.split('T')[0].split('-').join('');

    return `${aux}`;
  };

  function moreActivities() {
    if (seeMore <= activities.length) {
      setSeeMore(seeMore + 5);
  } else {
      setSeeMore(5);
  }
  }

{if(activities !== null){
  return (
    <>
      <div className={styles.area_label}>{title}</div>
      {activities.data.slice(0, seeMore).map((item: any, index: any) => {
        if (fixDate(item.startTimeLocal) > dateNow) {         
          return (
            <div key={index}>
              <ActivitiesCard
                item={item}
                getVoucher={getVoucher}
                cancelReservation={cancelReservation}
                setModalShow={setModalShow}
               setReservation={setReservation}
              />
            </div>
          );
        }
        {activities?.data.length > 5 ?
          <div className="flex justify-center mb-20">
            <button onClick={moreActivities} className={styles.button}>
              {dic?.seeMore}
            </button>
          </div>
          :
          <></>} 
      })}
           
    </>
  );
}else{
  return(
    <></>
  )
}
}
};

export default NextActivities;
