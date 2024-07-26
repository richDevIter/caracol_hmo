import React from "react";
import DatePicker from "react-multi-date-picker"

import styles from "./SingleCalendarBirthday.module.css";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


const CustomMultipleInput = ({ openCalendar, value, setValue, defaultTime }: any) => {
  //let time: any = defaultTime?.split("-").reverse().split("/");
  if (!value) {
    value = defaultTime;
  }

  setValue(value)

  return (
    <input
      className={`${styles.calendar_birthday} form-control bg-white frm-sm py-2 pl-5`}
      onFocus={openCalendar}
      value={value}      
      id="singleCalendarId"
      placeholder="Quando?"
      readOnly
    />
  )
}


const SingleCalendarBirthday = (props: any) => {

  return (
    <DatePicker
      id="date-picker"
      weekDays={weekDays}
      months={months}
      format={`DD/MM/YYYY`}
      maxDate={new Date()}
      render={
        <CustomMultipleInput
          setValue={props.setValue}
          defaultTime={props.defaultTime}
        />
      }
    />
  )
}

export default SingleCalendarBirthday;