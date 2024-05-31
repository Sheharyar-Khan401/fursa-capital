import react, { useEffect } from "react";
import { globalVariables } from "../../helper/globalVariables";
import { useForm } from "react-hook-form";
import { Button } from "../../shared/components/Button";
import { TextInput } from "../../shared/components/TextInput";
import { DetailResolver } from "../../validators/UserValidation";
import { useRef, useState } from "react";
import AuthLayout from "../../shared/components/authLayout";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { PhoneInput } from "../../shared/components/PhoneNumberInput";
import CustomDatePicker from "../../shared/components/CustomDatePicker";
import { setBasicDetails } from "../../redux/Slice/RegisterSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const BasicDetails = (props) => {
  const { onTapNext } = props || {};
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: DetailResolver,
    defaultValues: {
      phoneNumber: "",
      individualSSN: "",
    },
  });
  const basicDetail = useSelector((state) => state.register.basicDetails);
  const userInfo = useSelector((state) => state.register.userInfo);
  const [checkValidation, setCheckValidation] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const modalRef = useRef();
  const [apiData, setApiData] = useState({
    title: "",
    desc: "",
    type: "pending",
  });
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    title: "",
    trialDate: "",
    country: "",
    citizenship: "",
    phoneNumber: "",
    SSN: "",
  });
  const Name = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            handleFormData("title", "Mr");
            // setDropdownName("Mr");
          }}
        >
          <Link
            className={`text-black text-md  ${
              formData.title == "Mr" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Mr
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            handleFormData("title", "Mrs");
            // setDropdownName("Mrs");
          }}
        >
          <Link
            className={`text-black text-md ${
              formData.title == "Mrs" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Mrs
          </Link>
        </div>
      ),
    },
  ];
  const locationDropDown = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            handleFormData("country", "US");
            // setDropdownName("Mr");
          }}
        >
          <Link
            className={`text-black text-md ${
              formData.country == "US" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            US
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            handleFormData("country", "Canada");
            // setDropdownName("Mrs");
          }}
        >
          <Link
            className={`text-black text-md ${
              formData.country == "Canada" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Canada
          </Link>
        </div>
      ),
    },
  ];
  const citizenshipDropdown = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            handleFormData("citizenship", "Resident");
            // setDropdownName("Mr");
          }}
        >
          <Link
            className={`text-black text-md ${
              formData.citizenship == "Resident" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Resident
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            handleFormData("citizenship", "Non-Resident");
            // setDropdownName("Mrs");
          }}
        >
          <Link
            className={`text-black text-md ${
              formData.citizenship == "Non-Resident"
                ? "font-bold"
                : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Non-Resident
          </Link>
        </div>
      ),
    },
  ];

  const updateUser = async (basicData) => {
    const userDocRef = doc(db, "users", userInfo?.docId);
    setLoading(true);
    try {
      await updateDoc(userDocRef, {
        ...basicData,
      }).then(() => {
        dispatch(setBasicDetails(basicData));
        setApiData({
          ...apiData,
          title: globalVariables.addedDetails,
          desc: globalVariables.addedSuccessDesc,
          type: "success",
        });
        setLoading(false);
      });
    } catch (error) {
      setApiData({
        ...apiData,
        title: globalVariables.error,
        desc: error.message,
        type: "pending",
      });
      setLoading(false);
    }
  };

  const onCloseModal = () => {
    if (apiData.type === "success") {
      onTapNext?.();
      // reset();
    }
  };

  const getInfo = async () => {
    if (basicDetail && Object.keys(basicDetail).length) {
      setFormData({
        title: basicDetail.title,
        trialDate: basicDetail.trialDate,
        country: basicDetail.country,
        citizenship: basicDetail.citizenship,
        phoneNumber: basicDetail.phoneNumber,
        SSN: basicDetail?.SSN,
      });
    }
  };

  useEffect(() => {
    getInfo();
  }, [basicDetail]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    if (formData.title && formData.country && formData.citizenship) {
      onTapNext?.();
    }
    return;
  };

  const onCheckValidation = () => {
    setCheckValidation(true);
  };

  const handleFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <AuthLayout ref={modalRef} apiData={apiData} onCloseModal={onCloseModal}>
      <>
        <span className="pt-4 text-gray-900 font-semibold text-3xl">
          {globalVariables.DetailsHeading}
        </span>
        <span className="pt-3 text-gray-500 text-center font-regular text-base lg:w-[100%] md:w-[300px] w-[220px]">
          {globalVariables.DetailsDescription}
        </span>
        <form
          onSubmit={onHandleSubmit} //handleSubmit(onHandleSubmit)
          className="lg:w-full items-center flex  pb-[50px] flex-col md:pb-[0px] max-[400px]:w-[90%]"
        >
          <div className="mt-4" />
          <div>
            <div className="flex lg:flex-row flex-col gap-4">
              <div>
                <p className="text-gray-700 text-sm font-bold mb-1.5">
                  {globalVariables.DetailsTitle}
                </p>
                <Dropdown menu={{ items: Name }}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Space className="px-3 border border-1 rounded-lg py-3 w-[360px] justify-between">
                      {formData.title || "Select title"}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <CustomDatePicker
                label={globalVariables.dateOfBirth}
                defaultDate={dayjs(date).format("YYYY/MM/DD")}
                onSetDate={(value) => handleFormData("trialDate", value)}
                width="w-[360px]"
                placeholder={globalVariables.dateOfBirth}
                checkValidation={checkValidation}
                // disabled={!isEditable}
                // maxDate={new Date()}
              />
            </div>
            <div className="mt-[10px] lg:mt-5" />
            <div className="flex lg:flex-row flex-col  gap-4">
              <div>
                <p className="text-gray-700 text-sm font-bold mb-1.5">
                  {globalVariables.country}
                </p>
                <Dropdown menu={{ items: locationDropDown }}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Space className="px-3 border border-1 rounded-lg py-3 w-[360px] justify-between">
                      {formData.country || globalVariables.countryPlaceholder}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div>
                <p className="text-gray-700 text-sm font-bold mb-1.5">
                  {globalVariables.cintizenship}
                </p>
                <Dropdown
                  menu={{
                    items: citizenshipDropdown,
                  }}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Space className="px-3 border border-1 rounded-lg py-3 w-[360px] justify-between">
                      {formData.citizenship || globalVariables.resident}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div className="mt-[10px] lg:mt-0 mr-0 lg:mr-5" />
            </div>
            <div className="mt-[10px] lg:mt-5" />
            <div className="flex lg:flex-row flex-col ">
              <PhoneInput
                register={register}
                name="phoneNumber"
                placeholder={globalVariables.phoneNumber}
                errorMsg={errors.phoneNumber?.message}
                // disabled={!isEditable}
                label={globalVariables.enterPhoneNumber}
                value={formData.phoneNumber}
                onChange={(e) => handleFormData("phoneNumber", e.target.value)}
              />
              <div className="mt-[10px] lg:mt-0 mr-0" />
              <TextInput
                name="individualSSN"
                setValue={(title, value) => handleFormData("SSN", value)}
                value={formData.SSN}
                width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
                label={globalVariables.SSN}
                placeholder={globalVariables.SSN}
                // errorMsg={errors.individualSSN?.message}
              />
            </div>
            <div className="mt-6 mb-6 w-[100%] self-end justify-end" />
            <div className="flex justify-end w-[100%]  pr-4">
              <div className="" />
              <Button
                onClick={onCheckValidation}
                label={globalVariables.next}
                width="w-32"
                disabled={loading}
              />
            </div>
          </div>
          <div className="mt-6" />
        </form>
      </>
    </AuthLayout>
  );
};

export default BasicDetails;
