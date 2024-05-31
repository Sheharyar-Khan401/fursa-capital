import React, { useEffect, useRef, useState } from "react";
import { OutlineButton } from "../OutlineButton";

const Drawer = ({ direction, children, setIsDrawerOpen, isDrawerOpen }) => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const getPositionClasses = () => {
    switch (direction) {
      case "top":
        return "top-0 left-0 right-0 w-full";
      case "left":
        return "left-0 top-0 bottom-0 w-72";
      case "right":
        return "right-0 top-0 bottom-0 w-72";
      case "bottom":
        return "bottom-0 left-0 right-0 w-full";
      default:
        return "";
    }
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {isDrawerOpen && (
        <div
          ref={drawerRef}
          className={`fixed ${getPositionClasses()} bg-white shadow-md transition-transform duration-500 z-10 ease-in-out w-[100%] transform ${
            isDrawerOpen
              ? "translate-x-0"
              : direction === "right"
              ? "translate-x-full"
              : direction === "left"
              ? "-translate-x-full"
              : direction === "top"
              ? "-translate-y-full"
              : "translate-y-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex justify-end p-2 drop-shadow-xl">
            
            {/* <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-500 hover:text-gray-700 mt-2 mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button> */}
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default Drawer;
