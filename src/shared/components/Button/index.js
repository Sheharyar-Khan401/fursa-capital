import Loader from "../Loader";
import "./styles.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
export const Button = (props) => {
  const {
    label,
    onClick,
    color = "text-white",
    width = "w-full lg:w-full max-[400px]:w-[100%]",
    disabled = false,
    icon,
    loading,
    prefix = true,
    HTMLTYPE,
    transparent = false,
    className
  } = props || {};
  return (
    <div
      className={`h-11 ${width} ${disabled ? "bg-gray-600" : transparent ? "bg-white border border-gray-600" : "bg-[#58b5ac]"}  rounded-lg items-center justify-center flex
      ${className}
      `} //gradient ${disabled ? "opacity-50" : ""}
    >
      <button
        type={HTMLTYPE ? HTMLTYPE : ""}
        onClick={onClick}
        className={`${width} ${disabled && "cursor-not-allowed"} ${color} h-11 font-semibold text-base  flex flex-row justify-center items-center`}
        disabled={disabled}
      >
        {!!icon && prefix && (
          <img src={icon} alt="" className="mr-2 w-5 h-5" />
        )}
        {loading ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 20, color: "white" }}
                spin
              />
            }
          />
        ) : (
          label
        )}

        {!!icon && !prefix && (
          <img src={icon} alt="" className="ml-2 w-5 h-5" />
        )}
      </button>
    </div>
  );
};
