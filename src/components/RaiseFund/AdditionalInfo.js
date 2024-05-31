import React from "react";
import { globalVariables } from "../../helper/globalVariables";
import { SwitchAbleBtn } from "../../shared/components/SwitchableBtn/switchableBtn";
import { TextInput } from "../../shared/components/TextInput";

export default function AdditionalInfo(props) {
    const {setCompanyDetails, companyDetails} = props
  return (
    <div className="mt-10">
      <div className="py-10 px-10  bg-[#f4f4f4] lg:w-[70%] lg:m-auto rounded-md lg:mb-10 mb-20 ">
        <p className="lg:text-h2 font-extrabold text-2xl lg:pb-3">
          {globalVariables.additionalInfoTitle}
        </p>
        <p className="text-md font-normal">
          {globalVariables.additionalinfodesc}
        </p>
        <br />
        <p className="lg:w-[45%] font-medium py-4">{globalVariables.regCf}</p>
        <div className="flex align-middle lg:flex-row flex-col ">
          <div className="w-[50%] ">
            <SwitchAbleBtn
              label={globalVariables.regCf}
              description={globalVariables.reCfdesc}
              getValue={(value) =>
                setCompanyDetails({
                  ...companyDetails,
                  investmentCompaign: value,
                })
              }
              value={companyDetails?.investmentCompaign}
            />
          </div>
          <p className="text-[#777777] lg:w-[50%] align-middle justify-end text-left pt-6 lg:pt-0 font-normal text-[13px] w-[90%]">
            {globalVariables.reCfdesc}
          </p>
        </div>

        <br />
        <TextInput
          name="runaway"
          width="lg:w-[350px] w-[100%]"
          label={globalVariables.companyRunawayTitle}
          placeholder={globalVariables.companyRunawayplaceHolder}
          value={companyDetails?.runaway}
          bold="font-bold"
          onChange={(e) =>
            setCompanyDetails({
              ...companyDetails,
              runaway: e.target.value,
            })
          }
          description={globalVariables.companyRunawayDesc}
          validate={false}
        />

      </div>
    </div>
  );
}
