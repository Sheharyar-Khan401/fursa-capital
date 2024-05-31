import React, { useState, useEffect } from "react";
import { globalVariables } from "../../helper/globalVariables";
import { TextInput } from "../../shared/components/TextInput";
import { Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { SwitchAbleBtn } from "../../shared/components/SwitchableBtn/switchableBtn";
import { db, storage } from "../../firebase";
import { Button } from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { DownOutlined } from "@ant-design/icons";
import CustomDatePicker from "../../shared/components/CustomDatePicker";
import { useSelector } from "react-redux";
import AdditionalInfo from "../../components/RaiseFund/AdditionalInfo";
import AddressDetails from "../../components/RaiseFund/Address";
import ImageUploader from "../../components/RaiseFund/ImageUploader";
import { playButton } from "../../helper/images";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { close } from "../../helper/icons";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

function RaiseFund(props) {
  
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.register.userInfo);
  const { contextHolder, openNotification } = useNotification();
  const [dropdownName, setDropdownName] = useState("Select");
  const [companydropdownName, setcompanyDropdownName] = useState("Select");
  const [purposedropdownName, setpurposeDropdownName] = useState("Select");
  const [date, setDate] = useState("");
  const [checkValidation, setCheckValidation] = useState(false);
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState(null);
  const [companyDetails, setCompanyDetails] = useState({
    status: "idle",
  });
  const [companyInfo, setCompanyInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchCompany();
  }, [db]);

  async function fetchCompany() {
    try {
      const docRef = doc(db, "companies", params.id); //params.id
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCompanyDetails(docSnap.data());
        setImages(docSnap.data()?.mediaUrls ?? []);
        setDocs(docSnap.data()?.pitch);
        setpurposeDropdownName(
          docSnap.data()?.specialPurposeVehicle ?? "Select"
        );
        setDropdownName(docSnap.data()?.industry ?? "Select");
        setcompanyDropdownName(docSnap.data()?.communitySize ?? "Select");
        setCompanyInfo(docSnap.data());
        setLoading(false);
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  const handleDelete = (url) => {
    const storageRef = ref(storage, url.name);
    deleteObject(storageRef)
      .then(() => {
        setImages(images.filter((img) => img.name != url.name));
      })
      .catch((error) => {
        console.log("eroor while deleting document", error);
      });
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (params?.id) {
      const companyRef = doc(db, "companies", params.id);

      await updateDoc(companyRef, {
        ...companyDetails,
        mediaUrls: images,
        pitch: docs,
        // pitchUpdated: new Date()
        // mediaUrls: [...companyDetails?.mediaUrls, mediaurl],
        // url: companyDetails?.url ?? url,
      });
      setLoading(false);
      openNotification(
        "success",
        "Application submitted !",
        "Your application has been Updated."
      );
      setTimeout(() => {
        navigate("/companies");
      }, 3000);
      // }
    } else {
      const submittedValues = companyDetails;
      submittedValues["createdBy"] = props?.user?.docId;
      images?.length && (submittedValues["mediaUrls"] = images);
      submittedValues["issuerId"] = null;
      if (docs) {
        submittedValues["pitch"] = docs;
        submittedValues["pitchUpdated"] = new Date();
      }
      await addDoc(collection(db, "companies"), submittedValues);
      setLoading(false);
      openNotification(
        "success",
        "Application submitted !",
        "Your application has been submitted and is under review."
      );
      setTimeout(() => {
        navigate("/companies");
      }, 3000);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setDropdownName("Transportation");

            setCompanyDetails({
              ...companyDetails,
              industry: "Transportation",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              dropdownName == "Transportation" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Transportation
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setDropdownName("Services");

            setCompanyDetails({
              ...companyDetails,
              industry: "Services",
            });
          }}
        >
          <Link
            className={`text-black text-md  ${
              dropdownName == "Services" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Services
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            setDropdownName("Fintech");
            setCompanyDetails({
              ...companyDetails,
              industry: "Fintech",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              dropdownName == "Fintech" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Fintech
          </Link>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            setDropdownName("AeroSpace");
            setCompanyDetails({
              ...companyDetails,
              industry: "AeroSpace",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              dropdownName == "AeroSpace" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            AeroSpace
          </Link>
        </div>
      ),
    },
  ];
  const specialPurpose = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setpurposeDropdownName("Yes");
            setCompanyDetails({
              ...companyDetails,
              specialPurposeVehicle: "Yes",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              purposedropdownName == "Yes" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            Yes
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setpurposeDropdownName("No");
            setCompanyDetails({
              ...companyDetails,
              specialPurposeVehicle: "No",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              purposedropdownName == "No" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            No
          </Link>
        </div>
      ),
    },
  ];
  const company = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setcompanyDropdownName("N/A");
            setCompanyDetails({
              ...companyDetails,
              communitySize: "N/A",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              companydropdownName == "N/A" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            N/A
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setcompanyDropdownName("0-5K");
            setCompanyDetails({
              ...companyDetails,
              communitySize: "0-5K",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              companydropdownName == "0-5K" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            0-5K
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            setcompanyDropdownName("5-10K");
            setCompanyDetails({
              ...companyDetails,
              communitySize: "5-10K",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              companydropdownName == "5-10K" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            5-10K
          </Link>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            setcompanyDropdownName("10k-20K");
            setCompanyDetails({
              ...companyDetails,
              communitySize: "10k-20K",
            });
          }}
        >
          <Link
            className={`text-black text-md ${
              companydropdownName == "10k-20K" ? "font-bold" : "font-normal"
            } w-[100%] p-1 rounded inline-block`}
          >
            10k-20K
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="pb-16 ">
      {contextHolder}
      <div className="bg-[#f7f7f7]">
        <div className="lg:m-auto lg:w-[65%] xl:w-[60%] py-16 ml-6 w-[90%]">
          <div className="lg:text-h2 font-extrabold pb-4 text-2xl">
            {globalVariables.raiseHeading}
          </div>
          <div className="font-sans text-[#777777] lg:pt-3 ">
            {globalVariables.raiseDescription}
          </div>
        </div>
      </div>
      <form onSubmit={(e) => submitApplication(e)}>
        <div className="w-[100%] py-16 lg:items-center flex flex-col lg:ml-0 lg:px-[60px] ">
          <div className="lg:w-[80%] px-6 xl:w-[70%]">
            <div className="font-bold text-3xl lg:max-w-[50%]">
              {globalVariables.AboutCompany}
            </div>
            <div className="font-sans text-[#777777] py-2 max-w-[50%]">
              {globalVariables.requestinfo}
            </div>
            <br />
            <div>
              <TextInput
                name="company"
                value={companyDetails?.companyName}
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    companyName: e.target.value,
                  })
                }
                // max-[400px]: w-[358px]
                width=" lg:w-[360px] w-[100%] "
                label={globalVariables.companyTitle}
                placeholder="Enter company legal Name"
                bold="font-bold"
                description={globalVariables.companyDescription}
              />
              <br />
              <TextInput
                name="companyEmail"
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    companyEmail: e.target.value,
                  })
                }
                value={companyDetails?.companyEmail}
                width="lg:w-[360px] w-[100%]"
                label="Company Email"
                placeholder="Enter Company Email"
                bold="font-bold"
                description={globalVariables.companyDescription}
              />
              <br />
              <TextInput
                name="website"
                width="lg:w-[360px] w-[100%]"
                label={globalVariables.websiteTitle}
                value={companyDetails?.websiteUrl}
                placeholder={globalVariables.websitePlaceholder}
                bold="font-bold"
                description={globalVariables.websiteDescription}
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    websiteUrl: e.target.value,
                  })
                }
              />
              <br />
              <AddressDetails
                companyDetails={companyDetails}
                setCompanyDetails={setCompanyDetails}
              />
              <br />
              <CustomDatePicker
                label="Desired launch date(Deal)"
                defaultDate={
                  companyDetails?.date?.seconds ? dayjs(
                  companyDetails?.date?.toDate()
                ).format("YYYY/MM/DD") : dayjs().format('YYYY/MM/DD')}
                onSetDate={(value) =>
                  setCompanyDetails({
                    ...companyDetails,
                    date: value,
                  })
                }
                width="lg:w-[360px] w-[100%]"
                placeholder={globalVariables.dateOfBirth}
                checkValidation={checkValidation}
                maxDate={new Date()}
              />
              <br />
              <TextInput
                width="lg:w-[360px] w-[100%]"
                label="Minimum Investment Amount"
                value={companyDetails?.minimumAmount}
                placeholder={globalVariables.investPlaceholder}
                bold="font-bold"
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    minimumAmount: e.target.value,
                  })
                }
                description="Please add the minimum Amount you want to invest."
              />
              <br />
              {/* {console.log(
                "special purpose vehicle -==",
                companyDetails?.mediaUrls
              )} */}
              <div>
                <p className="text-gray-700 text-sm font-bold">
                  Use of Special Purpose Vehicle (SPV) for the raise
                </p>
                <div className="flex align-middle justify-between my-6 lg:flex-row flex-col">
                  <Dropdown menu={{ items: specialPurpose }}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Space className="px-3 border border-1 rounded-lg py-2 lg:w-[360px] w-[100%] justify-between">
                        {purposedropdownName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  <div className="text-[#777777] lg:w-[50%] pt-6 lg:pt-2 font-normal text-[13px] ">
                    fill whether you used the special purpose vechicle for this
                  </div>
                </div>
              </div>

              <TextInput
                width="lg:w-[360px] w-[100%]"
                label={globalVariables.investRaise}
                placeholder={globalVariables.investPlaceholder}
                value={companyDetails?.maxValue}
                bold="font-bold"
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    maxValue: e.target.value,
                  })
                }
                description={globalVariables.investDesc}
              />
              <br />

              <div>
                <p className="text-gray-700 text-sm font-bold">
                  {globalVariables.industryTitle}
                </p>
                <div className="flex align-middle justify-between my-6 lg:flex-row flex-col">
                  <Dropdown menu={{ items }}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Space className="px-3 border border-1 rounded-lg py-2 lg:w-[360px] w-[100%] justify-between">
                        {dropdownName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  <div className="text-[#777777] lg:w-[50%] pt-6 lg:pt-2 font-normal text-[13px] ">
                    {globalVariables.industryDescription}
                  </div>
                </div>
              </div>
              <br />
              <TextInput
                name="capitalRaised"
                width="lg:w-[360px] w-[100%]"
                label={globalVariables.capitalRaisedTitle}
                value={companyDetails?.capitalRaised}
                placeholder={globalVariables.capitalRaisedPlaceholder}
                bold="font-bold"
                description={globalVariables.capitalRaisedDescription}
                onChange={(e) => {
                  setCompanyDetails({
                    ...companyDetails,
                    capitalRaised: e.target.value,
                  });
                }}
              />
              <br />
              <p className="lg:w-[45%] font-medium py-4">
                {globalVariables.registerCountryTitle}
              </p>
              <div className="flex align-middle lg:flex-row flex-col justify-between">
                <SwitchAbleBtn
                  label={globalVariables.registerCountryTitle}
                  description={globalVariables.registereCountryDescription}
                  getValue={(value) =>
                    setCompanyDetails({
                      ...companyDetails,
                      us_incorporated: value,
                    })
                  }
                  value={companyDetails?.us_incorporated}
                />
                <p className="text-[#777777] lg:w-[50%] pt-6 lg:pt-0 font-normal text-[13px] w-[90%]">
                  {globalVariables.registereCountryDescription}
                </p>
              </div>
              <br />
              <p className="lg:w-[45%] font-medium py-4">
                {globalVariables.productAvailableTitle}
              </p>
              <div className="flex align-middle lg:flex-row flex-col ">
                <div className="w-[100%]">
                  <SwitchAbleBtn
                    label={globalVariables.productAvailableTitle}
                    description={globalVariables.productAvailableDescription}
                    getValue={(value) =>
                      setCompanyDetails({
                        ...companyDetails,
                        saleAvailability: value,
                      })
                    }
                    value={companyDetails?.saleAvailability}
                  />
                </div>
                <p className="text-[#777777] lg:w-[100%] pt-6  lg:pt-0 font-normal text-[13px] w-[90%]">
                  {globalVariables.productAvailableDescription}
                </p>
              </div>
              <br />
              <p className="lg:w-[45%] font-medium py-4">
                {globalVariables.generateRevenueTitle}
              </p>
              <div className="flex align-middle lg:flex-row flex-col">
                <div className="w-[50%]">
                  <SwitchAbleBtn
                    label={globalVariables.generateRevenueTitle}
                    description={globalVariables.generateRevenueDescription}
                    getValue={(value) =>
                      setCompanyDetails({
                        ...companyDetails,
                        generateingRevenue: value,
                      })
                    }
                    value={companyDetails?.generateingRevenue}
                  />
                </div>
                <p className="text-[#777777] lg:w-[50%] pt-6 lg:pt-0 font-normal text-[13px] w-[90%]">
                  {globalVariables.generateRevenueDescription}
                </p>
              </div>
              <br />
              <CustomDatePicker
                label="Deal Closing Date"
                defaultDate={companyDetails?.dealClosingDate?.seconds ? dayjs(
                  companyDetails?.dealClosingDate?.toDate()
                ).format("YYYY/MM/DD") : dayjs().format('YYYY/MM/DD')}
                onSetDate={(value) =>
                  setCompanyDetails({
                    ...companyDetails,
                    dealClosingDate: value,
                  })
                }
                width="lg:w-[360px] w-[100%]"
                placeholder="Deal Closing Date"
                checkValidation={checkValidation}
                maxDate={new Date()}
              />
              <br />
              <div>
                <p className="text-gray-700 text-sm font-bold">
                  What's the rough size of your community?
                </p>
                <div className="flex align-middle justify-between my-6 lg:flex-row flex-col ">
                  <Dropdown menu={{ items: company }}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Space className="px-3 border border-1 rounded-lg py-2 lg:w-[360px] w-[100%] justify-between">
                        {companydropdownName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                  <div className="text-[#777777] lg:w-[50%] pt-6 lg:pt-0 font-normal text-[13px] ">
                    {globalVariables.communitySizeDescription}
                  </div>
                </div>
              </div>
              <br />
              <TextInput
                name="companyDesc"
                width="lg:w-[360px] w-[100%]"
                label="Company Description"
                placeholder="Enter Description"
                bold="font-bold"
                value={companyDetails?.companyDescription}
                description="Please Enter the Brief summary of the Deal."
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    companyDescription: e.target.value,
                  })
                }
                maxLength={250}
              />
              <br />
              <p className="text-gray-700 text-sm font-bold">
                Upload Image or Video
              </p>
              <br />
              <div className="flex">
                {images?.length
                  ? images.map((dum) => (
                      <div>
                        {dum?.name.split(".")[1].toLowerCase() != "png" &&
                        dum?.name.split(".")[1].toLowerCase() != "jpg" ? (
                          <div className="h-[100px] w-[100px] relative rounded-md mr-4 justify-center bg-[#d0d5dd] flex items-center">
                            <img
                              src={close}
                              className="absolute right-1 top-1 cursor-pointer bg-gray-300"
                              onClick={() => handleDelete(dum)}
                            />
                            <img
                              src={playButton}
                              className="drop-shadow-2xl w-[40px] "
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              src={close}
                              className="absolute right-5 top-1 cursor-pointer bg-gray-300"
                              onClick={() => handleDelete(dum)}
                            />
                            <img
                              src={dum.url}
                              className="mr-4 rounded-md bg-primary object-cover h-[100px] w-[100px]"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  : null}
                <ImageUploader setImages={setImages} images={images} />
              </div>
              <br />
              <p className="text-gray-700 text-sm font-bold">Upload pitch</p>
              <br />
              <ImageUploader doc={true} docs={docs} setDocs={setDocs} />
            </div>
          </div>
          <AdditionalInfo
            setCompanyDetails={setCompanyDetails}
            companyDetails={companyDetails}
          />
        </div>

        <div className="flex items-center flex-col w-60 mx-auto">
          <Button label={"Submit application"} loading={loading} />
        </div>
      </form>
    </div>
  );
}

export default RaiseFund;
