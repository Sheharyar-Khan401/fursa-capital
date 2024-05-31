import React, { useEffect, useState } from "react";
import DealCards from "../../components/Companies/dealCards";
import { useLazyGetDealsQuery } from "../../redux/features/deals/dealsApiSlice";
import { ConfigProvider, Spin } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

function Companies({ user }) {
  const [deals, setDeals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [getDeals, result] = useLazyGetDealsQuery();
  const [isserIds, setIssuerIds] = useState([]);

  useEffect(() => {
    getDeals();
  }, []);

  useEffect(() => {
    if (result.isSuccess && result.data) {
      setDeals(result.data.items);
    }
  }, [result]);

  useEffect(() => {
    if (deals?.length > 0) {
      const ids = deals.map((deal) => deal.issuer.id);
      setIssuerIds(ids);
      fetchCompaniesbyIds(ids);
    }
  }, [deals]);

  async function fetchCompaniesbyIds(ids) {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "companies"), where("issuerId", "in", ids))
      );
      const companies = [];
      querySnapshot.forEach((docSnap) => {
        if (docSnap.exists()) {
          companies.push(docSnap.data());
        } else {
          console.log("Document not found");
        }
      });
      setCompanies(companies);
      return companies;
    } catch (error) {
      console.error("Error fetching document:", error);
      return [];
    }
  }

  return (
    <div className="sm:px-[12.5%] px-5 my-10 sm:my-12">
      <div className="space-y-1.5 sm:space-y-6">
        <div className="sm:text-h1 text-2xl font-bold md:font-extrabold sm:leading-[3.2rem]">
          Investment opportunities <br />
          on Fursa
        </div>
        <div className="sm:w-[30rem] text-lg text-gray-500">
          Browse current investment opportunities on Republic. All companies are
          vetted & pass due diligence.
        </div>
      </div>
      <div className="mt-16">
        <div className="text-3xl sm:text-4xl font-extrabold sm:font-bold">
          {user?.role === "admin" ? "Live Deals" : "Live Opportunities"}
        </div>
      </div>

      {result.isFetching ? (
        <div className="flex h-80 justify-center items-center">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#0000",
              },
            }}
          >
            <Spin tip="Loading..." size="large">
              <div className="p-6" />
            </Spin>
          </ConfigProvider>
        </div>
      ) : (
        <div className="grid gap-8 lg:gap-12 xl:grid-cols-3 md:grid-cols-2 mt-8">
          {deals?.length
            ? deals?.map((deal) => (
              <DealCards
                companyDesc={
                  companies.filter(
                    (res) => res.issuerId === deal.issuer.id
                  )[0]?.companyDescription
                }
                location={
                  companies.filter(
                    (res) => res.issuerId === deal.issuer.id
                  )[0]?.address?.country
                    ? `
              ${companies.filter((res) => res.issuerId === deal.issuer.id)[0]
                      ?.address?.city
                    },
               ${companies.filter((res) => res.issuerId === deal.issuer.id)[0]
                      ?.address?.country
                    }
               `
                    : false
                }
                hoverable={true}
                deal={deal}
                bgImg={
                  companies?.filter(
                    (res) => res.issuerId === deal.issuer.id
                  )[0]?.mediaUrls[0]?.url
                }
                logo
              />
            ))
            : null}
        </div>
      )}
    </div>
  );
}

export default Companies;
