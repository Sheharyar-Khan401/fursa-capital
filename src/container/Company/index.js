import { ConfigProvider, Empty, Progress, Skeleton, Spin, Tabs, Tag } from "antd";
import React, { useEffect, useState } from "react";
import SlideableContainer from "../../components/Deal/ImageSlider";
import { Button } from "../../shared/components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { grayBuilding } from "../../helper/images";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import AboutUs from "../../components/Company/about";
import PDFViewer from "../../shared/components/PdfViewer/pdfViewer";
import { useCreateNewCompanyMutation } from "../../redux/features/issuer/issuerApiSlice";
import { formatNumber } from "../../helper/utility";

function CompanyDetail(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [approving, setApproving] = useState(false)

  const params = useParams();
  const path = useLocation()
  const navigate = useNavigate();

  const [createCompany, results] = useCreateNewCompanyMutation()

  useEffect(() => {
    fetchCompany();
  }, [db]);

  async function fetchCompany() {
    try {
      setLoading(true)
      const docRef = doc(db, "companies", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
        setLoading(false)
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  const items = [
    {
      key: '1',
      label: 'About',
      children:
        <AboutUs name={data?.companyName ?? "__"}
          location={`${data?.address?.city}, ${data?.address?.country}`}
          us_incorporated={data?.us_incorporated}
          companySize={data?.communitySize}
          websiteUrl={data?.websiteUrl}
          industry={data?.industry}
          companyDescription={data?.companyDescription}
        />,
    },
    {
      key: '2',
      label: 'Pitch',
      children: data?.pitch ? (<div className="relative"><PDFViewer src={data?.pitch} /></div>) : <Empty />
    },
  ];

  const hanldeApprove = async () => {
    try {
      setApproving(true)
      const companyRef = doc(db, "companies", params.id);
      await updateDoc(companyRef, {
        status: "approved",
      });
      const companyRes = await createCompany({
        body: {
          name: data?.companyName,
          country: data?.address?.country,
          street: data?.address?.street,
          city: data?.address?.city,
          state: data?.address?.state,
          postal_code: data?.address?.postalCode,
        }
      })
      console.log(companyRes)
      await updateDoc(companyRef, {
        issuerId: companyRes?.data?.id,
      });
      setApproving(false)
      fetchCompany();
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = () => {
    navigate(`/raisefund/${params.id}`)
  }

  return (
    <>
      {loading ?
        <div className="h-screen flex flex-col justify-center">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#0000"
              },
            }}
          >
            <Spin tip="Loading..." size="large">
              <div className="p-6" />
            </Spin>
          </ConfigProvider>
        </div> :
        <div className="sm:px-[12.5%] px-5 my-10 sm:my-16">
          <div className="lg:text-h1 text-4xl font-bold md:font-extrabold flex space-x-2 md:space-x-4 items-center">
            <div className="border-gray-200 min-w-[2.5rem]">
              <img
                className="md:w-[2rem] md:mt-1 w-[1.9rem] h-[1.9rem] md:h-[2.5rem] rounded-[4px]"
                src={grayBuilding}
                alt="logo"
              />
            </div>
            <div className="md:mb-0 mb-1">{data?.companyName ?? 'Test Company'}</div>
          </div>

          <div className="mt-5 text-xl text-gray-500">
            {data?.us_incorporated && <Tag bordered={false} color="geekblue">
              us_incorporated
            </Tag>}
            {data?.generateingRevenue && <Tag bordered={false} color="geekblue">
              Generateing revenue
            </Tag>}
            {data?.saleAvailability &&
              <Tag bordered={false} color="geekblue">
                {"Sale availability"}
              </Tag>}
          </div>

          <div className="flex flex-row flex-wrap md:gap-16 my-7 md:my-10">
            <div className="w-full xl:basis-[64%] lg:basis-[63%]">
              <SlideableContainer media={data?.mediaUrls} />
            </div>
            <div className="w-full lg:basis-[26%] xl:basis-[28.5%] space-y-2 md:space-y-0">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-xl md:text-2xl font-bold">
                  {data?.capitalRaised && `$${formatNumber(data?.capitalRaised)}` + " Raised of $" + formatNumber(data?.maxValue) + " max goal"}
                </div>
                <div className="sm:block hidden">
                  {data?.maxValue ?
                    <Progress percent={(parseInt(data?.capitalRaised) / data.maxValue) * 100} status={"success"} showInfo={true} />
                    :
                    <hr className="sm:block hidden pb-5" />
                  }
                </div>
              </div>
              <div className="flex justify-between sm:block md:border-none border-t py-1">
                <div className="space-y-1.5 md:w-full w-1/2">
                  <div className="text-xl md:text-2xl font-bold">Funding raised</div>
                  <div className="text-base md:text-xl text-gray-500 pb-5">
                    ${formatNumber(data?.capitalRaised)}
                  </div>
                  <hr className="sm:block hidden pb-5" />
                </div>
                {data?.maxValue &&
                  <div className="space-y-2 border-l md:border-none w-1/2 sm:full sm:px-0 pl-5">
                    <div className="text-xl md:text-2xl font-bold">Funding Goal</div>
                    <div className="text-base md:text-xl text-gray-500">
                      ${formatNumber(data?.maxValue)}
                    </div>
                  </div>}
              </div>
              <hr className="mx-[-15px] md:hidden" />
              <div className="text-center md:w-full sm:relative py-4 md:pt-[2.8rem]">
                <Button
                  label={data?.status === "approved" ? "Approved" : path.state?.edit || path.pathname.includes("edit") ? "Update" : props?.user?.role === "admin" && `Approve`}
                  onClick={path.state?.edit || path?.pathname?.includes("edit") ? handleUpdate : hanldeApprove}
                  disabled={data?.status === "approved"}
                  loading={approving}
                />
              </div>
              {data?.status !== "approved" && props?.user?.role === "admin" &&
                <div className="text-center md:w-full sm:relative">
                  <Button
                    label={"Write a review"}
                    transparent
                    color="#000"
                    onClick={async () => {
                      try {
                        const companyRef = doc(db, "companies", params.id);
                        await updateDoc(companyRef, {
                          status: "pending",
                        });
                        const subject = encodeURIComponent("Review on application");
                        const signature = "\n\n--\nBest regards,\nFursa team";
                        const body = encodeURIComponent(`Dear Issuer, \n\n please use this link to update your business: ${window.location.href.replace("applications", "business/edit")}${signature}`);
                        window.location.href = `mailto:${data?.companyEmail}?subject=${subject}&body=${body}`;
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                  {/* <a href="mailto:jawad.hassan@globewyze.com?subject=Review on application&body=Hi jawad">Click to Send an Email</a> */}
                </div>}
            </div>
          </div>

          <div className="relative">
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    titleFontSizeLG: 25,
                    itemSelectedColor: "#58B5AC",
                    inkBarColor: "#58B5AC",
                    itemHoverColor: "#58B5AC",
                    itemActiveColor: "#58B5AC"
                  },
                },
              }}
            >
              <Tabs defaultActiveKey="1" size="large" items={items} />
            </ConfigProvider>
          </div>
        </div>
      }
    </>
  );
}

export default CompanyDetail;
