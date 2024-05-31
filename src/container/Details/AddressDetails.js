import react, { useEffect } from "react";
import { globalVariables } from "../../helper/globalVariables";
import { useForm } from "react-hook-form";
import { Button } from "../../shared/components/Button";
import { TextInput } from "../../shared/components/TextInput";
import { AddressResolver } from "../../validators/UserValidation";
import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../shared/components/authLayout";
// import Dropdown from "../../shared/components/Dropdown";
import { Link } from "react-router-dom";
import { OutlineButton } from "../../shared/components/OutlineButton";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAddressDetails } from "../../redux/Slice/RegisterSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const AddressDetails = (props) => {
  const { onTapPrevious, onTapNext } = props || {};

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: AddressResolver,
    defaultValues: {
      address1: "",
      address2: "",
      city: "",
      zip: "",
    },
  });
  const dispatch = useDispatch();
  const addressDetail = useSelector((state) => state.register.addressDetails);
  const userInfo = useSelector((state) => state.register.userInfo);
  const [checkValidation, setCheckValidation] = useState(false);
  const [date, setDate] = useState("");
  const [addressData, setAddressData] = useState({
    address1: "",
    address2: "",
    city: "",
    zip: "",
    state: "",
    country: "",
  });
  const modalRef = useRef();
  const [apiData, setApiData] = useState({
    title: "",
    desc: "",
    type: "pending",
  });
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const route = useLocation();
  const [isaggredited, setIsaggredited] = useState(false);

  const onCloseModal = () => {
    if (apiData.type === "success") {
      if (route.pathname.includes("issuer")) {
        onTapNext?.(props.userId);
      } else {
        navigate("/register");
      }
    }
  };

  const getInfo = async () => {
    if (addressDetail && Object.keys(addressDetail).length) {
      setAddressData({
        state: addressDetail.state,
        country: addressDetail.country,
        address1: addressDetail?.address1,
        address2: addressDetail?.address2,
        city: addressDetail?.city,
        zip: addressDetail?.zip,
      });
      setIsaggredited(addressDetail.aggredited);
    }
  };

 

  useEffect(() => {
    getInfo();
  }, [addressDetail]);

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
              addressData.country == "US" ? "font-bold" : "font-normal"
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
            className={`text-black text-md font-normal ${
              addressData.country == "Canada" ? "bg-primary text-white" : ""
            } w-[100%] p-1 rounded inline-block`}
          >
            Canada
          </Link>
        </div>
      ),
    },
  ];

  const stateDropdown = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            handleFormData("state", "Toranto");
            // setDropdownName("Mr");
          }}
        >
          <Link
            className={`text-black text-md ${
              addressData.state == "Toranto" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Toranto
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            handleFormData("state", "Malborine");
            // setDropdownName("Mrs");
          }}
        >
          <Link
            className={`text-black text-md font-normal ${
              addressData.state == "Malborine" ? "bg-primary text-white" : ""
            } w-[100%] p-1 rounded inline-block`}
          >
            Malborine
          </Link>
        </div>
      ),
    },
  ];

  const updateUser = async (addressData) => {
    const userDocRef = doc(db, "users", userInfo?.docId);
    setLoading(true);
    try {
      await updateDoc(userDocRef, {
        ...addressData,
      }).then(() => {
        // if (result?.data?.registerUser) {
        setApiData({
          ...apiData,
          title: globalVariables.addedDetails,
          desc: globalVariables.addedSuccessDesc,
          type: "success",
        });
        dispatch(setAddressDetails(addressData));
        setLoading(false);
        // setAddedId(docRef.id);
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

  const handleDetail = async (e) => {
    e.preventDefault();
    // const { address1, address2, city, zip } = getValues();
    const payload = { ...addressData, aggredited: isaggredited };
    await updateUser(payload);

    onTapNext?.();
    // if (detail == 0) {
    //   setDetail(1);
    // }
    // if (detail == 1) {
    //   setDetail(2);
    // }
  };

  const tapPrevious = () => {
    // dispatch(setTrialDetails({ ...getValues(), ...addressData }));
    onTapPrevious?.();
  };

  const handleFormData = (key, value) => {
    setAddressData({ ...addressData, [key]: value });
  };

  const innerContainerClass = "block lg:flex flex-row w-full lg:w-auto";

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
          onSubmit={handleDetail} //handleSubmit(handleDetail)
          className="lg:w-full items-center flex  pb-[50px] flex-col md:pb-[0px] max-[400px]:w-[90%]"
        >
          <div className="mt-4" />
          <div>
            <div className={innerContainerClass}>
              <TextInput
                // register={register}
                name="address1"
                width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
                label={globalVariables.Address1}
                setValue={(title, value) => handleFormData("address1", value)}
                value={addressData.address1}
                placeholder={globalVariables.Address1Placeholder}
                errorMsg={errors.address1?.message}
                textTransform="none"
              />
              <div className="mt-[10px] lg:mt-0 mr-0 lg:mr-5" />
              <TextInput
                // register={register}
                name="address2"
                setValue={(title, value) => handleFormData("address2", value)}
                value={addressData.address2}
                width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
                label={globalVariables.Address2}
                placeholder={globalVariables.Address2Placeholder}
                errorMsg={errors.address2?.message}
                textTransform="none"
              />
            </div>
            <div className="mt-[10px] lg:mt-5" />
            <div className={innerContainerClass}>
              <TextInput
                // register={register}
                name="city"
                setValue={(title, value) => handleFormData("city", value)}
                value={addressData.city}
                width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
                label={globalVariables.City}
                placeholder={globalVariables.City}
                errorMsg={errors.city?.message}
              />
              <div className="mt-[10px] lg:mt-0 mr-0 lg:mr-5" />
              <div>
                <p className="text-gray-700 text-sm font-bold mb-1.5">
                  {globalVariables.country}
                </p>
                <Dropdown
                  menu={{ items: stateDropdown }}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Space className="px-3 border border-1 rounded-lg py-3 w-[360px] justify-between">
                      {addressData.state || globalVariables.State}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="mt-[10px] lg:mt-5" />
            <div className={innerContainerClass}>
              <TextInput
                name="zip"
                type="number"
                setValue={(title, value) => handleFormData("zip", value)}
                value={addressData.zip}
                width="w-[358px] lg:w-[360px] max-[400px]:w-[100%]"
                label={globalVariables.Zip}
                placeholder={globalVariables.Zip}
                errorMsg={errors.zip?.message}
              />
              <div className="mt-[10px] lg:mt-0 mr-0 lg:mr-5" />
              <div>
                <p className="text-gray-700 text-sm font-bold mb-1.5">
                  {globalVariables.Country2}
                </p>
                <Dropdown
                  menu={{ items: locationDropDown }}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Space className="px-3 border border-1 rounded-lg py-3 w-[360px] justify-between">
                      {addressData.country || globalVariables.Country2}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className="mt-6 mb-6 w-[100%] self-end justify-end" />
            <span className="text-sm flex text-gray-600 font-regular align-super">
              <input
                type="checkbox"
                className="mr-2 mb-0 bg-gray-700"
                checked={isaggredited}
                onChange={(e) => setIsaggredited(!isaggredited)}
              />
              <span className="text-sm font-semibold">
                I am an Accredited Investor{" "}
                {/* <a href="/login" className="underline underline-offset-2">
                  {globalVariables.termsConditions}
                </a> */}
              </span>
            </span>
            <div className="mt-6 mb-6 w-[100%] self-end justify-end" />
            <div className="flex justify-end w-[100%]">
              <OutlineButton
                width={"w-32"}
                onClick={tapPrevious}
                label={globalVariables.previous}
              />
              <div className="ml-7" />
              <Button
                onClick={() => setCheckValidation(true)}
                label={globalVariables.next}
                width="w-32"
                disabled={loading}
              />
            </div>
            <div className="mt-6" />
          </div>
        </form>
      </>
    </AuthLayout>
  );
};

export default AddressDetails;
