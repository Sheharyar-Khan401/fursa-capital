import React, { useState, useEffect } from "react";
import DealCards from "../../components/Companies/dealCards";
import { emptywallet } from "../../helper/images";
import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { OutlineButton } from "../../shared/components/OutlineButton";
import { profileIcon } from "../../helper/images";
import { db } from "../../firebase";
import { ConfigProvider, Spin } from "antd";

function Business({user}) {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(1)
  const [loading, setLoading] = useState(false)

  const statusTabs = [
    {
      key: 1,
      label: "Live Businesses"
    },
    {
      key: 2,
      label: "Submitted"
    },
    {
      key: 3,
      label: "Pending"
    },
  ]



  useEffect(() => {
    if (activeTab === 1) {
      fetchLiveCompanies();
    } else if (activeTab === 2) {
      fetchSubmittedCompanies()
    } else if (activeTab === 3) {
      fetchReviewedCompanies()
    }
  }, [db, activeTab]);

  async function fetchLiveCompanies() {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(query(collection(db, 'companies'), where('status', '==', "approved"), where("createdBy", "==", user?.docId)));
      const business = [];
      querySnapshot.forEach((docSnap) => {
        if (docSnap.exists()) {
          business.push(docSnap);
        } else {
          console.log("Document not found");
        }
      });
      setData(business)
      setLoading(false)
      return business;
    } catch (error) {
      console.error("Error fetching document:", error);
      return [];
    }
  }

  async function fetchSubmittedCompanies() {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(query(collection(db, 'companies'), where('status', '==', "idle"), where("createdBy", "==", user?.docId)));
      const business = [];
      querySnapshot.forEach((docSnap) => {
        if (docSnap.exists()) {
          business.push(docSnap);
        } else {
          console.log("Document not found");
        }
      });
      setData(business)
      setLoading(false)
      return business;
    } catch (error) {
      console.error("Error fetching document:", error);
      return [];
    }
  }

  async function fetchReviewedCompanies() {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(query(collection(db, 'companies'), where('status', '==', "pending"), where("createdBy", "==", user?.docId)));
      const business = [];
      querySnapshot.forEach((docSnap) => {
        if (docSnap.exists()) {
          business.push(docSnap);
        } else {
          console.log("Document not found");
        }
      });
      setData(business)
      setLoading(false)
      return business;
    } catch (error) {
      console.error("Error fetching document:", error);
      return [];
    }
  }




  return (
    <div className="sm:px-[12.5%] px-5 my-10 sm:my-5">
      <div className="">
        <div className="items-center justify-between sm:flex  sm:border-b-[0.5px] align-middle">
          <div className="sm:text-h2 text-4xl font-bold sm:leading-[3.2rem] inline-block my-8">
            My Businesses
          </div>
          <ul className="sm:inline-block space-x-6">
            {statusTabs.map((res) => {
              return (
                <li
                  onClick={() => setActiveTab(res.key)}
                  key={res.key} className={`
                ${activeTab === res.key && "text-teal"}
                inline-block text-xl cursor-pointer hover:text-[#58B8AC] font-medium`}>
                  {res.label}
                </li>
              )
            })
            }
          </ul>
        </div>
        {loading ?
          <div className="flex h-64 justify-center items-center">
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
          data && !data?.length ? (
            <div className="bg-[#f2f2f2] w-full rounded-xl items-center py-10 my-10 sm:min-h-[400px] justify-center flex flex-col">
              <img src={emptywallet} className="mb-12" />
              <p className="text-center text-[#808080] text-lg font-medium ">
                Nothing here yet
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:gap-12 xl:grid-cols-3 md:grid-cols-2 mt-8">
              {data.map((res) => {
                return (
                  <DealCards
                    company={res}
                    edit={true}
                  />
                )
              })
              }
            </div>
          )}
      </div>
    </div>
  );
}

export default Business;
