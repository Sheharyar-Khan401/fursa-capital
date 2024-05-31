import React, { useState } from "react";
import { globalVariables } from "../../../helper/globalVariables";
import { TextInput } from "../../../shared/components/TextInput";
import { ContactInfo } from "./ContactInfo";
export const PersonalInfo = (props) => {
  const { userDetails, setUserDetails } = props;
  return (
    <div className="mt-3">
      <div className="font-extrabold text-4xl">
        {globalVariables.personalInfoheading}
      </div>
      <div className="flex sm:space-x-8 space-y-4 sm:space-y-0 sm:flex-row flex-col mt-8">
        <div className="sm:w-1/2">
          <TextInput
            name="firstName"
            className="w-full"
            value={userDetails?.firstName}
            label={globalVariables.firstName}
            placeholder={globalVariables.firstName}
            bold="font-bold"
          />
        </div>
        <div className="sm:w-1/2">
          <TextInput
            name="lastName"
            className="w-full"
            value={userDetails?.lastName}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                lastName: e.target.value,
              });
            }}
            label={globalVariables.lastName}
            placeholder={globalVariables.lastName}
            bold="font-bold"
          />
        </div>
      </div>
      <p className="text-[#999] font-medium pt-3 w-[90%]">
        {globalVariables.personaInfodesc}
      </p>

      <ContactInfo userDetails={userDetails} setUserDetails={setUserDetails} />
      {/* <p className="font-bold text-[18px] py-6">Identity Verification</p>
        <div className="text-[#999] font-semibold lg:w-[400px]">
          {globalVariables.RepublicUs}
        </div>
        <p className="py-8 text-[#999] font-medium w-[85%]">
          {globalVariables.identitydesc}{" "}
          <span className="text-[#58b5ac] font-normal">Privacy policy</span>
        </p>
        <div className="px-10 py-5 bg-[#f4f4f4]">
          <p className="font-bold text-[#555] text-2xl">
            Identity verification required
          </p>
          <p className=" text-[#111] font-medium pt-2">
            Please confirm your identity <strong>in the next 0 days</strong> to
            avoid having your investments automatically cancelled: .
          </p>
        </div>
        <div className="px-16 py-2 bg-[#58b5ac] lg:inline-block rounded-md text-white font-medium my-5 flex text-center justify-center">
          Verify Identity
        </div> */}
    </div>
  );
};
