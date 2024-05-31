import react, { useEffect } from "react";
import { globalVariables } from "../../helper/globalVariables";
import { useForm } from "react-hook-form";
import { Button } from "../../shared/components/Button";
import { TextInput } from "../../shared/components/TextInput";
import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../shared/components/authLayout";
import { setRegisterValues } from "../../redux/Slice/RegisterSlice";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { Spin } from "antd";
import { SignUpWithEmail, LoginWithEmail } from "../../redux/api/auth";
import { useGenerateAccessTokenMutation } from "../../redux/features/auth/authApiSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.register.userInfo);
  const navigate = useNavigate();
  const route = useLocation();
  const dispatch = useDispatch();
  const [addedId, setAddedId] = useState("");
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const auth = getAuth();
  const [error, setError] = useState({
    email: "",
    password: "",
    SignInError: "",
  });
  const modalRef = useRef();
  const [generateAccessToken, result] = useGenerateAccessTokenMutation();

  const addUser = async (user) => {
    // e.preventDefault();
    let userType = "";
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (route.pathname.includes("issuer")) {
      userType = "issuer";
    } else {
      userType = "investor";
    }
    try {
      LoginWithEmail(
        user,
        async (data) => {
          setLoading(false);
          setError({
            email: "",
            password: "",
            SignInError: "",
          });
          dispatch(setRegisterValues("test this"));
          await generateAccessToken({
            scope:
              "deals.read deals.write companies.read companies.write deals.investors.write",
          });
          navigate("/companies");
        },
        (error) => {
          setLoading(false);
          setError({ ...error, SignInError: error });
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
      setLoading(false);
    }
  };

  const [apiData, setApiData] = useState({
    title: "",
    desc: "",
    type: "pending",
  });

  const onCloseModal = () => {
    if (apiData.type === "success") {
      const data = { id: addedId };
      if (route.pathname.includes("issuer")) {
        navigate("/details/issuer", { state: data });
      } else {
        navigate("/details/investor", { state: data });
      }
    }
  };

  const handleChange = (title, value) => {
    setPayload({ ...payload, [title]: value });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const payloads = {
      ...payload,
    };
    addUser(payloads);
    // setLoading(true);
  };
  return (
    <div className="w-[100%] flex flex-col items-center pt-5 ">
      <div className="flex flex-col">
        <span className="pt-4 text-gray-900 font-semibold text-3xl text-center">
          {globalVariables.loginAccount}
        </span>
        <span className="pt-3 text-gray-500 font-regular text-base w-[358px] lg:w-[360px] max-[400px]:w-[100%] text-center">
          {globalVariables.startedEnterDetails}
        </span>
        <div className="mt-6" />
        <form
          onSubmit={handleSignIn} //handleSubmit(handleSignup)
          className="flex flex-col justify-center max-[400px]:w-[90%] self-center"
        >
          <TextInput
            // register={register}
            name="email"
            width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
            setValue={(title, value) => handleChange(title, value)}
            label={globalVariables.email}
            placeholder={globalVariables.enterEmail}
            errorMsg={error.email}
            type="email"
            textTransform="normal-case"
          />
          <div className="mt-6" />
          <TextInput
            // register={register}
            name="password"
            width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
            setValue={(title, value) => handleChange(title, value)}
            label={globalVariables.password}
            placeholder={globalVariables.tempPassword}
            errorMsg={error.password}
            type="password"
            textTransform="normal-case"
          />
          <div className="mt-6" />
          <div className="flex align-middle justify-center">
            <p>Don't have an account?</p>
            <p
              onClick={() => navigate("/register:issuer")}
              className="pl-1 text-[#58b5ac] cursor-pointer"
            >
              Sign Up
            </p>
          </div>
          <div className="mt-6" />
          {error.SignInError && (
            <p className="text-red font-medium">{error.SignInError}</p>
          )}
          <div className="mt-6" />
          {
            <Button
              width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
              label={globalVariables.login}
              loading={loading}
            />
          }
        </form>
        <div className="mt-4" />
      </div>
    </div>
  );
};

export default Login;
