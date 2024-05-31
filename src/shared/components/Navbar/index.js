import React, { useState } from "react";
import { boltIcon, briefCase, fileSubmit, fursaLogo } from "../../../helper/images";
import { OutlineButton } from "../OutlineButton";
import { ProfileDropdown } from "./ProfileDropdown/ProfileDropdown";
import { Menu } from "../../../helper/icons";
import Drawer from "../Drawer";
import SideBar from "../../../components/Drawer/sideBar";
import { useNavigate } from 'react-router';
import { Tooltip } from "antd";
import { Button } from "../Button";

function NavrBar({ user }) {
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className={`border-b shadow-lg flex justify-between w-full items-center py-4 bg-teal px-5 sm:px-[12.5%]`}>
      <div className={`${user?.role === "admin" ? "space-x-10" : "space-x-6"} flex items-center`}>
        <div className="relative">
          <img
            role='button' src={fursaLogo}
            alt="Fursa Capital Logo"
            className="sm:h-8 h-12 md:h-14" onClick={() => navigate("/companies")}
          />
          {user?.role === "admin" && <div className="absolute top-9 font-bold right-0 text-white">admin</div>}
        </div>
        <div className={`sm:block hidden`}>
          {user?.role !== "admin" &&
            <OutlineButton onClick={() => { navigate("/raisefund") }} label={"Raise Fund"} width="w-32" />
          }
        </div>
      </div>
      <div className="flex gap-6 items-center">
        {user?.role !== "admin" &&
          <Tooltip placement="top" title={"Notifications"}>
            <span role="button">
              <img className="w-[29px] h-[29px] sm:block hidden" src={boltIcon} />
            </span>
          </Tooltip>}
        {user?.role !== "admin" &&
          <Tooltip placement="top" title="My Portfolio">
            <span role="button" onClick={()=> navigate("/portfolio")}>
              <img className="w-[25px] h-[25px] sm:block hidden" src={briefCase} />
            </span>
          </Tooltip>}
        {user?.role === "admin" &&
          <span>
            <Button onClick={() => { navigate("/applications") }} icon={fileSubmit} className="border px-4 border-white" label="Applications" type="outlined" />
          </span>
        }
        <div className="ml-1 hidden sm:block">
          <ProfileDropdown user={user} />
        </div>
        <span role="button" className="inline sm:hidden">
          <img
            className="w-[29px] h-[29px]"
            src={Menu}
            onClick={(event) => {
              event.stopPropagation();
              setIsDrawerOpen(true);
            }}
          />
        </span>
        <Drawer
          direction={"right"}
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
        >
          <SideBar
            user={user}
            setIsDrawerOpen={setIsDrawerOpen}
            isDrawerOpen={isDrawerOpen}
          />
        </Drawer>
      </div>
    </div>
  );
}

export default NavrBar;
