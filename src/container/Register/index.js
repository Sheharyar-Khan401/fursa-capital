import react, { useEffect } from "react";
import { globalVariables } from "../../helper/globalVariables";
import { useForm } from "react-hook-form";
import { Button } from "../../shared/components/Button";
import { TextInput } from "../../shared/components/TextInput";
import { signupResolver } from "../../validators/UserValidation";
import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../shared/components/authLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { setRegisterValues,  clearUserData} from "../../redux/Slice/RegisterSlice";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { Spin } from "antd";
import { db } from "../../firebase";
import { useGenerateAccessTokenMutation } from "../../redux/features/auth/authApiSlice";
import { SignUpWithEmail, LoginWithEmail } from "../../redux/api/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    // watch,
    setValue,
  } = useForm({
    resolver: signupResolver,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [apiData, setApiData] = useState({
    title: "",
    desc: "",
    type: "pending",
  });

  const [generateAccessToken, result] = useGenerateAccessTokenMutation();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.register.userInfo);
  const navigate = useNavigate();
  const route = useLocation();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsConditions: false,
  });
  const auth = getAuth();
  const [ischecked, setIsChecked] = useState(false);
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsConditions: "",
    SignUpError: "",
  });
  const [todos, setTodos] = useState([]);
  const [addedId, setAddedId] = useState("");
  const modalRef = useRef();

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

  const addUser = async (user) => {
    // e.preventDefault();
    let userType = "";
    setLoading(true);
    if (route.pathname.includes("issuer")) {
      userType = "issuer";
    } else {
      userType = "investor";
    }
    if (user.password != user.confirmPassword) {
      setLoading(false);
      setError({
        ...error,
        confirmPassword: "Your passwod and confirm password should match",
      });
    } else {
      setError({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsConditions: "",
      });
      try {
        SignUpWithEmail(
          user,
          async (data) => {
            dispatch(clearUserData())
            setLoading(false);
            dispatch(setRegisterValues(data));
            navigate("/details");
            await generateAccessToken({
              scope:
                "deals.read deals.write companies.read companies.write deals.investors.write",
            });
            // navigate("/companies");
          },
          (error) => {
            setLoading(false);
            setError({ ...error, SignUpError: error });
          }
        );
      } catch (e) {
        console.error("Error adding document: ", e);
        setLoading(false);
      }
    }
  };

  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    setPayload({ ...payload, termsConditions: ischecked });
    if (ischecked) {
      setError({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsConditions: "",
      });
    }
  }, [ischecked]);

  const getInfo = async () => {
    if (userInfo && Object.keys(userInfo).length) {
      setPayload({
        ...payload,
        email: userInfo?.email,
        lastName: userInfo?.lastName,
        firstName: userInfo?.firstName,
        password: "",
        confirmPassword: "",
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, [userInfo]);

  const handleChange = (title, value) => {
    setPayload({ ...payload, [title]: value });
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const payloads = {
      ...payload,
      termsConditions: ischecked,
    };
    if (ischecked) {
      addUser(payloads);
    } else {
      setError({
        ...error,
        termsConditions: "Please accept the terms and condition",
      });
    }
    // setLoading(true);
  };
  return (
    <AuthLayout
      ref={modalRef}
      apiData={apiData}
      onCloseModal={onCloseModal}
      register={true}
    >
      <>
        <span className="pt-4 text-gray-900 font-semibold text-3xl">
          {globalVariables.createAccount}
        </span>
        <span className="pt-3 text-gray-500 font-regular text-base w-[358px] lg:w-[360px] max-[400px]:w-[100%] text-center">
          {globalVariables.startedEnterDetails}
        </span>
        <div className="mt-6" />
        <form
          onSubmit={handleSignup} //handleSubmit(handleSignup)
          className="flex flex-col justify-center max-[400px]:w-[90%] "
        >
          <TextInput
            // register={register}
            name="firstName"
            width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
            setValue={(title, value) => handleChange(title, value)}
            value={payload.firstName}
            label={globalVariables.firstName}
            placeholder={globalVariables.enterfirstName}
            errorMsg={error.firstName}
          />
          <div className="mt-4" />
          <TextInput
            // register={register}
            name="lastName"
            width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
            label={globalVariables.lastName}
            value={payload.lastName}
            setValue={(title, value) => handleChange(title, value)}
            placeholder={globalVariables.enterlastName}
            errorMsg={error.lastName}
          />
          <div className="mt-4" />
          <TextInput
            // register={register}
            name="email"
            width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
            setValue={(title, value) => handleChange(title, value)}
            value={payload.email}
            label={globalVariables.email}
            placeholder={globalVariables.enterEmail}
            errorMsg={error.email}
            type="email"
            textTransform="normal-case"
          />
          <div className="mt-4" />
          <TextInput
            // register={register}
            name="password"
            width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
            setValue={(title, value) => handleChange(title, value)}
            value={payload.password}
            label={globalVariables.password}
            placeholder={globalVariables.tempPassword}
            errorMsg={error.password}
            type="password"
            textTransform="normal-case"
          />
          <div className="mt-4" />
          <TextInput
            // register={register}
            name="confirmPassword"
            value={payload.confirmPassword}
            width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
            setValue={(title, value) => handleChange(title, value)}
            label={globalVariables.confirmPasswordSignUp}
            type="password"
            placeholder={globalVariables.tempPassword}
            errorMsg={error.confirmPassword}
            textTransform="normal-case"
          />
          <div className="mt-4" />
          <div>
            <span className="text-sm flex text-gray-600 font-regular align-super">
              <input
                type="checkbox"
                className="mr-2 mb-0 bg-gray-700"
                checked={payload.termsConditions}
                onChange={(e) => setIsChecked(!ischecked)}
              />

              <span className="text-sm font-semibold">
                I Agree to the{" "}
                <a href="/login" className="underline underline-offset-2">
                  {globalVariables.termsConditions}
                </a>
              </span>
            </span>
            <div className="py-3  self-center lg:text-left text-center">Already have an account? <span  onClick={() => navigate('/login')} className="pl-1 text-[#58b5ac] cursor-pointer">Sign In</span></div>
            {<p className="text-red font-medium">{error.termsConditions}</p>}
            {error.SignUpError && (
              <p className="text-red font-medium pt-5">{error.SignUpError}</p>
            )}
          </div>
          <div className="mt-6" />
          {
            <Button
              width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
              label={globalVariables.next}
              disabled={loading}
              loading={loading}
              // onClick= {() => handleSignup()}
            />
          }
        </form>
        <div className="mt-4" />
      </>
    </AuthLayout>
  );
};

export default Register;
