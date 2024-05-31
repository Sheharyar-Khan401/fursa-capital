import { forwardRef, useEffect, useState } from "react";
import { DatePicker } from "antd";
import { TextInput } from "../TextInput";
import { calendar, close } from "../../../helper/icons";
import "./styles.css";
import { globalVariables } from "../../../helper/globalVariables";
import { DEFAULT_DATE_FORMAT } from "../../../helper/utility";
import dayjs from "dayjs";

const CustomDatePicker = (props) => {
  const {
    width = "w-[358px] lg:w-[384px] max-[400px]:w-[100%]",
    placeholder,
    dateFormat = DEFAULT_DATE_FORMAT,
    showIconLeft = false,
    defaultDate = new Date(),
    onSetDate,
    checkValidation,
    label,
    disabled = false,
    isFaded,
    maxDate,
    minDate,
    onClear,
  } = props || {};
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  useEffect(() => {
    setSelectedDate(defaultDate);
  }, [defaultDate]);

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
    onSetDate(new Date(date));
  };
  return (
    <div className={width}>
      {!!label && (
        <span className="text-gray-700 font-medium text-sm">{label}</span>
      )}
      <div
        className={`relative flex ${
          showIconLeft ? "flex-row-reverse" : "flex-row"
        } `}
      >
        <DatePicker
          className="w-[100%] h-[47px] hover:border-[#939ba9] mt-1"
          value={dayjs(selectedDate)}        
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
