import React, { useEffect, useState } from "react";
import { globalVariables } from "../../helper/globalVariables";
import DealCards from "../../components/Companies/dealCards";
import { emptywallet } from "../../helper/images";
import { OutlineButton } from "../../shared/components/OutlineButton";
import { profileIcon } from "../../helper/images";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useLazyGetDealsByIdQuery } from "../../redux/features/deals/dealsApiSlice";
import { ConfigProvider, Spin } from "antd";

function Portfolio({ user }) {
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [investment, setInvestments] = useState({
    data: [],
    ids: [],
    businessids: [],
  });
  const [getDealsById, result] = useLazyGetDealsByIdQuery();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchInvestedDeals(user?.docId);
  }, [user]);

  useEffect(() => {
    if (investment.ids.length) {
      fetchCompanies(investment.businessids);
      getInestedDeals(investment.ids);
    }
  }, [investment]);

  async function fetchInvestedDeals(id) {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "investments"), where("userId", "==", id))
      );
      const investments = [];
      const ids = [];
      const businessids = [];

      querySnapshot.forEach((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          investments.push(data);
          ids.push(docSnap.data().dealId);
          businessids.push(docSnap.data().businessId);
        } else {
          console.log("Document not found");
        }
      });
      setInvestments({ data: investments, ids, businessids });
      return investments;
    } catch (error) {
      console.error("Error fetching document:", error);
      return [];
    }
  }

  async function getInestedDeals(arr) {
    try {
      const promises = arr.map(async (itemId) => {
        const res = await getDealsById(itemId);
        return res.data;
      });

      const deals = await Promise.all(promises);
      setData(deals);
      setLoading(false);
      return deals;
    } catch (error) {
      console.error("Error fetching nested deals:", error);
      setLoading(false);
      return [];
    }
  }


  async function fetchCompanies(ids) {
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
      console.error("Error fetching companies:", error);
      return [];
    }
  }

  return (
    <div className="sm:px-[12.5%] px-5 my-10 sm:my-5">
      <div className="">
        <div className="items-center justify-between sm:flex  sm:border-b-[0.5px] align-middle">
          <div className="sm:text-h2 text-4xl font-bold sm:leading-[3.2rem] inline-block my-8">
            {globalVariables.MyPortfolio}
          </div>
          <div className="sm:inline-block ">
            <p className="inline-block text-xl cursor-pointer text-[#58B8AC] font-medium">
              Investments
            </p>
          </div>
        </div>
        {loading ? (
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
        ) : data && !data?.length ? (
          <div className="bg-[#f2f2f2] w-full rounded-xl items-center py-10 my-10 sm:min-h-[400px] justify-center flex flex-col">
            <img src={emptywallet} className="mb-12" />
            <p className="text-center text-[#808080] text-lg font-medium ">
              Nothing here yet
            </p>
            <p className="text-center mt-6 text-[#808080] text-lg font-medium">
              Start Building your Portfolio
            </p>
            <a
              className="cursor-pointer text-[#0049ff] text-lg text-center block font-medium"
              href="/#"
            >
              browse live deals
            </a>
          </div>
        ) : (
          <div className="grid gap-8 lg:gap-12 xl:grid-cols-3 md:grid-cols-2 mt-8">
            {data?.map((response) => {
              return (
                <DealCards
                  deal={response}
                  logo
                  companyDesc={
                    companies?.filter(
                      (res) => res.issuerId === response?.issuer.id
                    )[0]?.companyDescription
                  }
                  bgImg={
                    companies?.filter(
                      (res) => res.issuerId === response.issuer.id
                    )[0]?.mediaUrls[0]?.url
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
