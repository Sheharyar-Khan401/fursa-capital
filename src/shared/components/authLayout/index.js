import { forwardRef } from "react";
// import { sideImage } from "helper/images";
import { PopUpMessages } from "../../../shared/components/PopupMessage";
// import { logo } from "helper/images";

const AuthLayout = forwardRef((props, ref) => {
  const {
    children,
    register,
    apiData = {
      title: "",
      desc: "",
      type: "pending",
    },
    onCloseModal = () => {},
  } = props;

  return (
    <div className="App login-container-gradient">
      <div className="flex row overflow-auto">
        <div
          className={
            register
              ? "w-screen  lg:w-[100%] flex flex-col  md:justify-center lg:justify-center items-center"
              : "w-screen lg:w-[100%] flex flex-col  md:justify-center lg:justify-center items-center"
          }
        >
          {children}
        </div>
      </div>
      <PopUpMessages
        title={apiData.title}
        desc={apiData.desc}
        type={apiData.type}
        ref={ref}
        onCloseModal={onCloseModal}
      />
    </div>
  );
});

export default AuthLayout;
