import React, { useEffect, useState } from "react";
import { fursaLogo } from "../../../helper/images";
import { globalVariables } from "../../../helper/globalVariables";
import { OutlineButton } from "../OutlineButton";
import { useLocation  , useNavigate} from "react-router-dom";

const Header = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  useEffect(() => {
    if (route.pathname.includes("issuer")) {
      setUserType("issuer");
    } else {
      setUserType("investor");
    }
  }, [route.pathname]);

  const navigateUser = ()=>{
    if (route.pathname.includes("issuer")) {
        navigate("/register/investor");
      } else {
        navigate("/register/issuer");
      }
  }

  return (
    <header className={`bg-teal -400 p-4 flex ${route.pathname.includes("register") ? 'justify-between' : 'justify-center md:justify-between'}`}>
      <img src={fursaLogo} alt="Fursa Capital Logo" className="h-8 md:h-12" />
      <OutlineButton
        hidden = {`${!route.pathname.includes("register") ? 'hidden' :''} `}
        onClick={navigateUser}
        label={
          userType == "investor"
            ? globalVariables.raiseFund
            : globalVariables.invest
        }
        width="w-32"
      />
    </header>
  );
};

export default Header;
