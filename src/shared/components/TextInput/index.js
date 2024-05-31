import { password, passwordDisable } from "../../../helper/icons";
import "./styles.css";
import { useState } from "react";
import "../../../index.css";

export const TextInput = (props) => {
  const {
    label,
    placeholder,
    type = "text",
    width,
    errorMsg = "",
    name,
    register,
    description,
    bold,
    validate = true,
    value,
    setValue,
    className = "",
    disabled = false,
    pattern = "\\S+.*\\S*",
    textTransform = "capitalize",
    maxLength = 1000,
    prefix,
    ...rest
  } = props || {};
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col w-[100%]">
      {!!label && (
        <span
          className={`text-gray-700 text-sm mb-1.5 ${
            bold ?? "font-medium"
          } lg:max-w-[50%]`}
        >
          {label}
        </span>
      )}
      <div
        className={`${isPassword ? "flex lg:flex-row  relative flex-col" : "" }`}
      >
        <div className={`flex lg:flex-row ${isPassword ? "relative" : ""} flex-col justify-between`}>
          { prefix &&
            <div className="absolute left-2 top-[10.5px] text-lg" >{prefix}</div>
          }
          
          <input
            // {...register?.(name)}
            type={isPassword ? (!showPassword ? "password" : "text") : type}
            onChange={(e) => setValue(name, e.target.value)}
            placeholder={placeholder}
            // ${textTransform}
            className={`  ${width} ${
              disabled && "bg-white/50"
            } rounded-lg border border-solid ${
              errorMsg ? "border-red" : "border-gray-300"
            } py-2.5 px-3.5 ${
              disabled ? "text-gray-900/50" : "text-gray-900"
            } font-inter font-normal text-md leading-6 text-base focus:outline-none h-12
            ${prefix && "px-5"}
            ${className} 
            `}
            value={value}
            disabled={disabled}
            title="cannot consist of only spaces"
            pattern={pattern}
            {...rest}
            required={validate}
            maxLength={maxLength}
          />
          {description && (
            <div className="text-[#777777] w-[100%] lg:w-[50%] pt-6 lg:pt-0 font-normal text-[13px]">
              {/* lg:pl-8 pt-6 lg:pt-0 font-normal text-[13px] */}
              {description}
            </div>
          )}
        </div>
        {isPassword && (
          <img
            src={showPassword ? password : passwordDisable}
            onClick={() => setShowPassword(!showPassword)}
            alt=""
            height={20}
            width={20}
            className="custom-icon"
          />
        )}
      </div>
      {!!errorMsg && (
        <span className="text-red font-medium max-w-[352px] text-sm mt-1">
          {errorMsg}
        </span>
      )}
    </div>
  );
};
