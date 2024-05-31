import react, { useEffect } from "react";
import { globalVariables } from "../../helper/globalVariables";
import { useForm } from "react-hook-form";
import { Button } from "../../shared/components/Button";
import { TextInput } from "../../shared/components/TextInput";
import { companyResolver } from "../../validators/UserValidation";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../shared/components/authLayout";
import { PhoneInput } from "../../shared/components/PhoneNumberInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCompanyDetails } from "../../redux/Slice/RegisterSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { OutlineButton } from "../../shared/components/OutlineButton";
import { useDispatch, useSelector } from "react-redux";

const OrganizationDetail = (props) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: companyResolver,
    defaultValues: {
      companyName: "",
      companyEIN: "",
      companyphoneNumber: "",
      companyEmail: "",
      companyWebsiteUrl: "",
    },
  });
  const modalRef = useRef();
  const dispatch = useDispatch();
  const companyDetail = useSelector((state) => state.register.companyDetails);
  const userInfo = useSelector((state) => state.register.userInfo);
  const [apiData, setApiData] = useState({
    title: "",
    desc: "",
    type: "pending",
  });
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyEIN: "",
    companyphoneNumber: "",
    companyEmail: "",
    companyWebsiteUrl: "",
  });

  const onCloseModal = () => {
    if (apiData.type === "success") {
      AsyncStorage.clear();
      navigate("/register");
    }
  };

  const updateUser = async (companyData) => {
    const userDocRef = doc(db, "users", userInfo.docId);
    setLoading(true);
    try {
      await updateDoc(userDocRef, {
        ...companyData,
      }).then(() => {
        dispatch(setCompanyDetails(companyData));
        setApiData({
          ...apiData,
          title: globalVariables.addedDetails,
          desc: globalVariables.addedSuccessDesc,
          type: "success",
        });
        setLoading(false);
      });
    } catch (error) {
      console.log("error while saving company details", error);
      setApiData({
        ...apiData,
        title: globalVariables.error,
        desc: error.message,
        type: "pending",
      });
      setLoading(false);
    }
  };

  const innerContainerClass = "block lg:flex flex-row w-full lg:w-auto";

  const getInfo = async () => {
    if (companyDetail && Object.keys(companyDetail).length) {
      setCompanyData({
        companyName: companyData.companyName,
        companyEIN: companyData.companyEIN,
        companyphoneNumber: companyData.companyphoneNumber,
        companyEmail: companyData.companyEmail,
        companyWebsiteUrl: companyData.companyWebsiteUrl
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, [companyDetail]);

  const handleFormData = (key, value) => {
    setCompanyData({ ...companyData, [key]: value });
  };

  const tapPrevious = (event) => {
    event.preventDefault();
    props.onTapPrevious?.();
  };

  const handleDetail = (e) => {
    e.preventDefault();
    updateUser(companyData);
    navigate("/companies");
  };

  return (
    <AuthLayout ref={modalRef} apiData={apiData} onCloseModal={onCloseModal}>
      <div className="flex flex-col pb-10">
        <span className="pt-4 text-gray-900 font-semibold text-3xl text-center">
          {globalVariables.DetailsHeading}
        </span>
        <span className="pt-3 text-gray-500 text-center font-regular text-base lg:w-[100%] md:w-[300px] w-[220px]">
          {globalVariables.DetailsDescription}
        </span>
        <form
          onSubmit={handleDetail} //handleSubmit(handleDetail)
          className="flex flex-col justify-center max-[400px]:w-[90%]"
        >
          {/* <span className="pt-10 text-gray-300 font-semibold font-regular text-base">
            {globalVariables.DetailsOrganizationHeading}
          </span> */}
          <div className="mt-10" />
          <div className={innerContainerClass}>
            <TextInput
              // register={register}
              name="companyName"
              setValue={(title, value) => handleFormData("companyName", value)}
              value={companyData.companyName}
              width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
              label={globalVariables.companyNameLabel}
              placeholder={globalVariables.companyNameLabel}
              errorMsg={errors.companyName?.message}
            />
            <div className="mt-[10px] lg:mt-0 mr-0 lg:mr-5" />
            <TextInput
              // register={register}
              setValue={(title, value) => handleFormData("companyEIN", value)}
              value={companyData.companyEIN}
              name="companyEIN"
              width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
              label={globalVariables.companyEIN}
              placeholder={globalVariables.companyEIN}
              errorMsg={errors.companyEIN?.message}
            />
          </div>
          <div className="mt-4" />
          <div className={innerContainerClass}>
            <PhoneInput
              register={register}
              name="companyphoneNumber"
              placeholder={globalVariables.companyPhoneNumber}
              errorMsg={errors.companyphoneNumber?.message}
              disabled={!true}
              label={globalVariables.companyPhoneNumber}
              value={companyData.companyphoneNumber}
              onChange={(e) =>
                handleFormData("companyphoneNumber", e.target.value)
              }
            />
            <div className="mt-[10px] lg:mt-0 mr-0 lg:mr-5" />
            <TextInput
              // register={register}
              setValue={(title, value) => handleFormData("companyEmail", value)}
              value={companyData.companyEmail}
              name="companyEmail"
              width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
              label={globalVariables.companyEmail}
              placeholder={globalVariables.companyEmail}
              errorMsg={errors.companyEmail?.message}
              type="email"
              textTransform="none"
            />
          </div>
          <div className="mt-4" />
          <TextInput
            // register={register}

            setValue={(title, value) =>
              handleFormData("companyWebsiteUrl", value)
            }
            value={companyData.companyWebsiteUrl}
            name="companyWebsiteUrl"
            width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
            label={globalVariables.companyWebsite}
            placeholder={globalVariables.companyWebsite}
            errorMsg={errors.companyWebsiteUrl?.message}
            textTransform="none"
          />
          <div className="mt-2 mb-6 w-[100%]" />
          <div className="mt-2 mb-6 w-[100%]" />
          <div className="flex justify-end w-[100%]">
            <OutlineButton
              width={"w-32"}
              onClick={tapPrevious}
              label={globalVariables.previous}
            />
            <div className="ml-7" />
            <Button
              type="submit"
              // onClick={() => setCheckValidation(true)}
              label={globalVariables.next}
              width="w-32"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default OrganizationDetail;
