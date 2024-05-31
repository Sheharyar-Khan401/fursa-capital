import { ConfigProvider, Empty, Progress, Skeleton, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import SlideableContainer from "../../components/Deal/ImageSlider";
import { Button } from "../../shared/components/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLazyGetDealsByIdQuery } from "../../redux/features/deals/dealsApiSlice";
import { grayBuilding } from "../../helper/images";
import { useLazyGetIssuerByIdQuery } from "../../redux/features/issuer/issuerApiSlice";
import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../firebase";
import PDFViewer from "../../shared/components/PdfViewer/pdfViewer";
import AboutUs from "../../components/Company/about";
import { formatNumber } from "../../helper/utility";
import dayjs from "dayjs";

function DealDetails(props) {
  const [getDealsById, result] = useLazyGetDealsByIdQuery();
  const [getCompanyById, companyDetail] = useLazyGetIssuerByIdQuery();
  const [deal, setDeal] = useState(null);
  const [data, setData] = useState(null)
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setDeal(result.data)
    if (result.data) {
      getCompanyById(result?.data?.issuer?.id)
      fetchCompany(result?.data?.issuer?.id)
    }
  }, [result]);
  useEffect(() => {
    getDealsById(params?.id);
  }, []);

  async function fetchCompany(id) {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'companies'), where('issuerId', '==', id)));
      querySnapshot.forEach((docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("Document not found");
        }
      });
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
          location={`${companyDetail?.data?.addresses?.items[0]?.city}, ${companyDetail?.data?.addresses?.items[0]?.country}`}
          us_incorporated={data?.us_incorporated}
          companySize={data?.companySize}
          websiteUrl={companyDetail?.data?.company_url}
          industry={data?.industry}
        />,
    },
    {
      key: '2',
      label: 'Pitch',
      children: data?.pitch ? (
        <div className="relative">
          <div className="flex space-x-5 mt-2 mb-5 items-center">
            <div className="font-medium text-lg sm:text-xl">Pitch Updated:</div>
            <div className="font-bold text-lg sm:text-xl text-teal">{dayjs.unix(data?.pitchUpdated?.seconds).format("MMM DD, YYYY")}</div>
          </div>
          <PDFViewer src={data?.pitch} />
        </div>)
        : <Empty />
    },
  ];

  return (
    <div className="sm:px-[12.5%] px-5 my-10 sm:my-16">
      {result.isFetching ?
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
        </div>
        :
        <div className="lg:text-h1 text-4xl font-bold md:font-extrabold flex space-x-2 items-center">
          <div className="border-gray-200 min-w-[2.5rem]">
            <img
              className="md:w-[2.5rem] w-[1.9rem] h-[1.9rem] md:h-[2.5rem] rounded-[4px]"
              src={result?.data?.issuer?.logo ?? "https://uploads.republic.com/p/offerings/logos/medium/000/002/007/2007-1694100218-64a8a5bba2d907b8b7d6b7476bc4bedc6c0f24cd.png"}
              alt="logo"
            />
          </div>
          <div className="md:mb-0 mb-1">{deal?.title ?? 'Test Company'}</div>
        </div>
      }
      <div className="px-2 flex space-x-4 mt-5 text-xl text-gray-500">
        <img src={grayBuilding} className="w-[25px] h-[25px]" />
        <span>{deal?.enterprise?.name ?? "Test Company"}</span>
      </div>

      <div className="flex flex-row flex-wrap md:gap-16 my-7 md:my-10">
        <div className="w-full xl:basis-[64%] lg:basis-[63%]">
          <SlideableContainer />
        </div>
        <div className="w-full lg:basis-[26%] xl:basis-[28.5%] space-y-2 md:space-y-5">
          <div className="space-y-1 sm:space-y-2">
            <div className="text-[26px] md:text-4xl font-bold">{deal?.funding?.funds_received ?? "$10"}</div>
            <div className="text-base md:text-xl text-gray-500">
              {(deal?.funding?.funds_received / data?.maxValue) * 100}% raised of {formatNumber(data?.maxValue)} max goal
            </div>
            <div className="sm:block hidden">
              <Progress percent={(deal?.funding?.funds_received / data?.maxValue) * 100} status={"success"} showInfo={false} />
            </div>
          </div>
          <div className="flex justify-between sm:block md:border-none border-t py-1">
            <div className="space-y-1.5 md:w-full w-1/2">
              <div className="text-[26px] md:text-4xl font-bold">{deal?.investors?.total ?? '414'}</div>
              <div className="text-base md:text-xl text-gray-500 pb-5">
                Investors
              </div>
              <hr className="sm:block hidden pb-5" />
            </div>
            <div className="space-y-2 border-l md:border-none w-1/2 sm:full sm:px-0 pl-5">
              <div className="text-[26px] md:text-4xl font-bold">
                {
                  data?.dealClosingDate ? dayjs.unix(data?.dealClosingDate?.seconds).diff(dayjs(), "day") : "0"
                }
                &nbsp;days
              </div>
              <div className="text-base md:text-xl text-gray-500">
                Left to invest
              </div>
            </div>
          </div>
          <hr className="mx-[-15px] md:hidden" />
          <div className="text-center md:w-full sm:relative py-4 md:py-0 mt-10">
            <Button
              label={`Invest in ${deal?.title ?? "Test Company"}`}
              onClick={() => navigate("/investor/suitability", { state: deal })}
            />
            ${`${formatNumber(companyDetail?.data?.minimum_investment??0)} minimum investment`}
          </div>
        </div>
      </div>

      {
        companyDetail?.data && <div className="relative">
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
      }
    </div>
  );
}

export default DealDetails;
