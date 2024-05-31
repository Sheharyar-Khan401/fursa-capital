import React, { useEffect, useState } from "react";
import { profileIcon } from "../../helper/images";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { close } from "../../helper/icons";

function SideBar(props) {
  const { isDropdownOpen, setIsDropdownOpen, setIsDrawerOpen } = props;
  const [justifyActive, setJustifyActive] = useState("tab1");
  const navigate = useNavigate();
  const [userProfileDropdownLinks, setUserProfileDropdownLinks] = useState([
    { name: "My Portfolio", route: "/portfolio" },
    { name: "My Business", route: "/business" },
    { name: "Settings", route: "/settings" },
    { name: "Notifications", route: "#" },
  ]);

  useEffect(() => {
    if (props.user?.role === "admin") {
      setUserProfileDropdownLinks(prevLinks => [
        ...prevLinks,
        { name: "Submitted Applications", route: "/applications" }
      ]);

    }
  }, [props.user])

  return (
    <div className="px-5 justify-between flex flex-col h-[100%] ">
      <div>
        <div className="justify-between flex items-center my-8">
          <div className="flex items-center">
            <img
              src={profileIcon}
              alt="profile-pic"
              width={56}
              height={56}
              className={`rounded-lg border border-gray-400 bg-gray-400 inline`}
            // onClick={toggleDropdown}
            />
            <div className="ml-4 font-semibold text-lg">
              {props.user?.firstName + " " + props.user?.lastName}
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-500 hover:text-gray-700 bg-gray-200 p-2 rounded-md"
          >
            <img
              src={close}
              alt=""
              height={20}
              width={20}
              className="cursor-pointer"
            />
          </button>
        </div>

        {true && (
          <div className="py-4 mt-2">
            <ul>
              {userProfileDropdownLinks.map((menuItem, index) => (
                <li className="px-2 py-[8px] hover:bg-gray-200 " key={index}>
                  <Link
                    onClick={() => setIsDrawerOpen(false)}
                    to={menuItem.route}
                    className="text-black text-base font-medium border-b py-4 flex"
                  >
                    {menuItem.name}
                  </Link>
                </li>
              ))}
              <li className="px-2 py-[8px] hover:bg-gray-200 border-b mt-10">
                <Link
                  href="/"
                  // onClick={() => {
                  //   auth.signOut();
                  //   router.push("/signin");
                  // }}
                  className="text-black text-base font-medium text-red"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="mb-10 w-[100%] justify-center items-center align-middle ">
        <div
          onClick={() => {
            navigate("/raisefund");
            setIsDrawerOpen(false);
          }}
          className="bg-primary text-lg font-medium text-center py-1.5 xxs:py-2.5 text-[white] rounded-lg"
        >
          Raise Fund
        </div>
      </div>
    </div>
  );
}

export default SideBar;
