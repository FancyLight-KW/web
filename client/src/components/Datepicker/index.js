import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled, { css } from "styled-components";
import "./Datepicker.css";

const DatepickerWrapper = styled.div`
  margin-left: 10px;
  margin-top: -1px;
`;

// const Datepickers = styled.(DatePicker)`
//   .react-datepicker__day-name,
//   .react-datepicker__day {
//     width: 1.5em;
//     line-height: 1.9em;
//     margin: 0.166em;
//   }
// `;

const Datepicker = ({ change }) => {
  const [startDate, setStartDate] = useState();

  const showChange = (date) => {
    // 상위 Component로 date값 반환하기 위한 함수
    change(date);
  };

  const dateChanger = (date) => {
    if (date === null) {
      return "";
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month > 9 ? month : "0" + month;
    day = day > 9 ? day : "0" + day;

    return String(year + month + day);
  };

  return (
    <DatepickerWrapper>
      <DatePicker
        dateFormat="yyyy-MM-dd" // 날짜 형식 설정
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          //console.log(dateChanger(date));
          showChange(dateChanger(date));
        }}
      />
    </DatepickerWrapper>
  );
};

export default Datepicker;
