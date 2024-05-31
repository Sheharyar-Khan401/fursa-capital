"use client";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { profileIcon } from "../../../../helper/images";
import { auth } from "../../../../firebase";
import { store } from "../../../../redux/store";
import { clearToken } from "../../../../redux/Slice/authSlice";
import { clearUserInfo } from "../../../../redux/Slice/RegisterSlice";

export const ProfileDropdown = ({ user }) => {

  const userProfileDropdownLinks = [
    // { name: "My Profile", route: "/settings" },
    { name: "My Portfolio", route: "/portfolio" },
    { name: "My Business", route: "/business" },
    { name: "Settings", route: "/settings" },
  ];

  const userProfileDropdownLinksAdmin = [
    // { name: "My Profile", route: "/settings" },
    // { name: "Businesses", route: "/business" },
    { name: "Applications", route: "/applications" },
    { name: "Notifications", route: "/#" },
    // { name: "Settings", route: "/settings" },
  ];

  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative group cursor-pointer z-50" ref={dropdownRef}>
      <img
        src={profileIcon}
        alt="profile-pic"
        width={35}
        height={35}
        className={`rounded-lg border border-gray-400 bg-gray-400`}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute py-4 px-4 right-[-80px] mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul>
            {user?.role !== "admin" ?
              userProfileDropdownLinks.map((menuItem, index) => (
                <li
                  className="px-4 py-[8px] hover:bg-gray-200 place rounded-xl"
                  key={index}
                >
                  <Link
                    onClick={toggleDropdown}
                    to={menuItem.route}
                    className="text-black text-md font-normal"
                  >
                    {menuItem.name}
                  </Link>
                </li>
              )) :
              userProfileDropdownLinksAdmin.map((menuItem, index) => (
                <li
                  className="px-4 py-[8px] hover:bg-gray-200 place rounded-xl"
                  key={index}
                >
                  <Link
                    onClick={toggleDropdown}
                    to={menuItem.route}
                    className="text-black text-md font-normal"
                  >
                    {menuItem.name}
                  </Link>
                </li>
              ))
            }

            <div className="h-[0.5px] my-3 opacity-[0.20] bg-secondary-gray-700"></div>

            <li className="px-4 py-[8px] hover:bg-gray-200  place rounded-xl">
              <button
                onClick={() => {
                  navigate("/register/investor")
                  auth.signOut();
                  store.dispatch(clearToken())
                  store.dispatch(clearUserInfo())
                }}
                className="text-black text-md font-normal"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
