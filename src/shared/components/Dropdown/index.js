import { arrowDown } from "../../../helper/icons";
import { useRef, useEffect, useState } from "react";

const Dropdown = (props) => {
  const {
    dropdownOptions,
    width = "w-[358px] lg:w-[384px] max-[400px]:w-[100%]",
    placeholder,
    showIconLeft = false,
    checkValidation,
    defaultOption = "",
    onChange,
    label,
    errorMsg,
    description,
    disabled = false,
    isFaded,
    fund,
    dynamicHeight = false,
    className = "",
    customContent,
  } = props || {};
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
    }
  }, [defaultOption]);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {!!label && (
        <div className="mb-0.5">
          <span
            className={`text-gray-700 text-sm ${
              fund ? "font-bold" : "font-medium"
            }`}
          >
            {label}
          </span>
        </div>
      )}
      <div className="flex lg:flex-row flex-col justify-between">
        <button
          type="button"
          className={`${width} flex  ${
            !selectedOption && checkValidation ? "border-red" : ""
          }
          ${showIconLeft ? "flex-row-reverse" : "flex-row"} ${
            showIconLeft ? "justify-end" : "justify-between"
          }
          items-center rounded-lg border border-gray-300 shadow-sm px-2.5 py-2.5  ${
            isFaded ? "bg-[#ffffff80]" : "bg-white"
          }
          text-base font-regular text-gray-500 focus:outline-none h-12 ${customContent} ${className}`}
          onClick={toggleDropdown}
          disabled={disabled}
        >
          <span
            className={selectedOption !== "" ? "" : "text-gray opacity-[0.7]"}
          >
            {selectedOption || placeholder}
          </span>
          {!disabled && (
            <img
              src={arrowDown}
              height={20}
              width={20}
              alt=""
              className={`transform rotate-180 ${
                showIconLeft ? "mr-[5px]" : ""
              }`}
            />
          )}
        </button>
        {description && (
          <div className="text-[#777777] lg:w-[50%] pt-6 lg:pt-0 font-normal text-[13px] ">
            {description}
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className={`origin-top-right ${
            !fund ? "absolute" : ""
          } right-0 mt-2 rounded-lg shadow-lg ${
            !dynamicHeight ? "max-h-[180px]" : ""
          } overflow-y-scroll bg-white ${width} z-50`}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {dropdownOptions.map((option, index) => (
              <button
                key={option}
                onClick={(event) => {
                  event.stopPropagation();
                  selectOption(option);
                }}
                className={`block w-full text-left px-4 py-4 text-sm text-gray-700 hover:bg-primary/50 hover:text-white ${
                  index !== dropdownOptions?.length - 1 ? "border-b" : ""
                } border-gray-200`}
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      {!!errorMsg && (
        <span className="text-red font-medium text-sm mt-1 pt-2">
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export default Dropdown;
