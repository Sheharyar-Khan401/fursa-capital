import React, { useState } from "react";
import { TextInput } from "../../../shared/components/TextInput";
import { globalVariables } from "../../../helper/globalVariables";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import Loader from "../../../shared/components/Loader";
import { useNotification } from "../../../hooks/useNotification";
export const ContactInfo = (props) => {
  const { userDetails, setUserDetails } = props;
  const [loading, setLoading] = useState(false);
  const { contextHolder, openNotification } = useNotification();
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, "users", userDetails?.docId);
      await updateDoc(userRef, {
        ...userDetails,
      });
      setLoading(false);
      openNotification(
        "success",
        "Information Updated !",
        "Your Information has been Updated."
      );
    } catch (error) {
      console.log('error while updating values')
    }
  };
  return (
    <div className="mt-5">
      {contextHolder}
      {/* <div className="flex space-x-8 lg:flex-row flex-col">
          <div className="w-1/2">
            <TextInput
              name="email"
              className="w-full"
              label={globalVariables.email}
              placeholder={globalVariables.enterEmail}
              bold="font-bold"
            />
          </div>
          <div className="w-1/2">
            <TextInput
              name="password"
              className="w-full"
              label={globalVariables.currentPassword}
              placeholder={globalVariables.currentPassword}
              bold="font-bold"
            />
          </div>
        </div> */}
      <div className="text-xl font-semibold">Mailing address</div>
      <form className="my-6 space-y-5">
        <TextInput
          name="Street"
          className="w-full"
          value={userDetails?.address1}
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              address1: e.target.value,
            });
          }}
          label={"Primary address"}
          placeholder={globalVariables.enterLocation}
          bold="font-bold"
        />
        <TextInput
          name="Street"
          className="w-full"
          value={userDetails?.address2}
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              address2: e.target.value,
            });
          }}
          label={"Secondary address"}
          placeholder={globalVariables.enterLocation}
          bold="font-bold"
        />
        {/* <TextInput
          name="suite"
          label={globalVariables.suite}
          bold="font-bold"
          className="w-full"
        /> */}
        <div className="flex sm:space-x-8 sm:space-y-0 space-y-4 sm:flex-row flex-col">
          <TextInput
            name="Country"
            value={userDetails?.country}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                country: e.target.value,
              });
            }}
            label={globalVariables.Country2}
            bold="font-bold"
            className="w-full"
          />

          <TextInput
            name="City"
            className="w-full"
            value={userDetails?.city}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                city: e.target.value,
              });
            }}
            label={globalVariables.City}
            bold="font-bold"
          />
        </div>
        <div className="flex sm:space-x-8 space-y-4 sm:space-y-0 sm:flex-row flex-col">
          <TextInput
            name="State"
            className="w-full"
            value={userDetails?.state}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                state: e.target.value,
              });
            }}
            label={globalVariables.State}
            bold="font-bold"
          />

          <TextInput
            className="w-full"
            name="PostalCode"
            value={userDetails?.zip}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                zip: e.target.value,
              });
            }}
            label={globalVariables.PostalCode}
            bold="font-bold"
          />
        </div>

        <div
          className="px-8 py-2 bg-[#58b5ac] inline-block rounded-md text-white font-medium my-5 cursor-pointer"
          onClick={() => handleUpdate()}
        >
          {loading ? <Loader className={"my-0"} /> : globalVariables.UpdateBtn}
        </div>
      </form>
    </div>
  );
};
