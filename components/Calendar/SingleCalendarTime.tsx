import React, { useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import styles from './SingleCalendarTime.module.css';
import { usePathname } from "next/navigation";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const today:string = new Date().toLocaleDateString();



const CustomMultipleInput = ({ openCalendar, value, setTime}: any) => {

  useEffect(() => {
    if (value.length === 1) {
      setTime(value[0]);
    } else {
      setTime(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  
  
  return (
    <div>
      <input
        id="calendar"
        className={`${styles.bg_calendar_single_time} bg-white frm-sm py-2 pl-5`}
        onFocus={openCalendar}
        value={value}
        readOnly
        placeholder={today}
      />
    </div>
  )
}


const SingleCalendarTime = ( props:any ) => {

  const pathname = usePathname();
  
  const transferC2: any = localStorage.getItem("transferC2");
  const transferItemJSON = JSON.parse(transferC2);

  return (
    <DatePicker
      id="date-picker"
      minDate={new Date()}
      weekDays={weekDays}
      months={months}
      value={pathname === '/transfers' ? transferItemJSON.date + " " + transferItemJSON.time : ""}
      format={`DD/MM/YYYY HH:mm`}
      render={<CustomMultipleInput setTime={props.setTime} />}
      plugins={[
        // eslint-disable-next-line react/jsx-key
        <TimePicker
          hideSeconds
          style={{ minWidth: "100px" }}
        />
      ]}
    />
  )
}

export default SingleCalendarTime;