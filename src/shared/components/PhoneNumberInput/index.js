import "./styles.css";
import { useEffect, useRef } from "react";
import Inputmask from "inputmask";

export const PhoneInput = (props) => {
  const {
    label,
    placeholder,
    type = "text",
    width = "w-[358px] lg:w-[360px] max-[400px]:w-[100%]",
    errorMsg = "",
    name,
    value,
    className = "",
    disabled = false,
    pattern = "\\S+.*\\S*",
    textTransform = "capitalize",
    ...rest
  } = props || {};
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      Inputmask("999-999-9999").mask(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col lg:w-[95%] w-[100%]">
      {!!label && (
        <span className="text-gray-700 font-medium text-sm mb-1.5">
          {label}
        </span>
      )}
      <div className={`flex row`}>
        <input
          ref={ref}
          type={"text"}
          placeholder={placeholder}
          className={`${textTransform} ${width} ${className} ${
            disabled && "bg-white/50"
          } rounded-lg border border-solid  ${
            errorMsg ? "border-red" : "border-gray-300"
          } py-2.5 px-3.5 ${
            disabled ? "text-gray-900/50" : "text-gray-900"
          } font-inter font-normal text-md leading-6 text-base focus:outline-none`}
          value={value}
          disabled={disabled}
          title="cannot consist of only spaces"
          pattern={pattern}
          {...rest}
        />
      </div>
      {!!errorMsg && (
        <span className="text-red font-medium max-w-[352px] text-sm mt-1">
          {errorMsg}
        </span>
      )}
    </div>
  );
};
