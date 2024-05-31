import React, { useState } from "react";
import { useScreenDimensions } from "../../hooks/useScreenDimension";
import { useNavigate } from "react-router";
import { defaultImage } from "../../helper/images";

function DealCards(props) {
  const { hoverable, deal, company, edit, companyDesc, location, bgImg, logo } =
    props;
  const [hoverState, setHoverState] = useState(false);
  const [width] = useScreenDimensions();
  const navigate = useNavigate();

  const getBackgroundImage = () => {
    if (bgImg) {
      return bgImg;
    } else if (company?.data().mediaUrls?.length) {
      const bgURL = company.data().mediaUrls[0]?.url;
      if (
        bgURL &&
        (company.data().mediaUrls[0]?.name.endsWith(".png") ||
          company.data().mediaUrls[0]?.name.endsWith(".jpg"))
      ) {
        return `${bgURL}`;
      }
    }
    return defaultImage;
  };

  return (
    <div
      key={deal?.id ?? Math.random()}
      className={`hover:shadow-sm min-h-[475px] border overflow-hidden rounded-md bg-no-repeat bg-contain`}
    >
      <img className="w-full h-60" src={getBackgroundImage()} />
      <div
        role="button"
        className={`relative h-[248px] px-5 py-3 bg-white transition-all duration-500 ${hoverState && "hover:h-[330px] hover:-mt-[5.8rem]"
          }`}
        onMouseEnter={() => width > 768 && hoverable && setHoverState(true)}
        onMouseLeave={() => width > 768 && hoverable && setHoverState(false)}
        onClick={() => {
          deal
            ? navigate(`/deal/${deal?.id}`)
            : !edit
              ? company && navigate(`/applications/${company.id}`)
              : navigate(`/business/edit/${company.id}`, {
                state: { edit: true },
              });
        }}
      >
        {logo && (
          <div className="absolute mt-[-48px] border-gray-200">
            <img
              className="w-[3rem] h-[3rem] rounded-md"
              src={
                deal?.issuer?.logo
                  ? deal?.issuer?.logo
                  : "https://uploads.republic.com/p/offerings/logos/medium/000/002/007/2007-1694100218-64a8a5bba2d907b8b7d6b7476bc4bedc6c0f24cd.png"
              }
              alt="logo"
            />
          </div>
        )}
        <div className="space-y-2 max-h-28">
          {deal && (
            <div className="font-semibold text-2xl">
              {deal?.title ?? "Test Comapny"}
            </div>
          )}
          {company && (
            <div className="font-semibold text-2xl">
              {company?.data().companyName ?? "Test Comapny"}
            </div>
          )}
          <div>
            {`${company?.data()?.companyDescription ??
              companyDesc ??
              "Esse quis et ea esse aute eiusmod.Labore amet dolor enim nisi."
              }`}
          </div>
        </div>
        {!hoverState ? (
          <div className="absolute left-5 bottom-5">
            <div className="">
              {deal?.address?.item[0]?.city ?? company?.data()?.address?.city
                ? `${company?.data()?.address?.city}, ${company.data()?.address?.country
                }`
                : location
                  ? location
                  : "AQ plaza, Islamabad"}
            </div>
            {deal && (
              <div className="bg-gray-200 p-1 mt-1 w-max text-[11px]">
                {deal?.deal_type ?? "FINTECH & FINANCE"}
              </div>
            )}
            {company && (
              <div className="bg-gray-200 p-1 mt-1 w-max text-[11px]">
                {company?.data()?.industry ?? "industry"}
              </div>
            )}
          </div>
        ) : (
          deal && (
            <div className="mt-[5.5rem]">
              <div className="border-t py-2 px-5 mx-[-20px]">
                <strong>${deal?.funding?.funds_received ?? "0"}</strong> Raised
              </div>
              <div className="border-t py-2 px-5 mx-[-20px]">
                <strong>{deal?.investors?.total ?? "0"}</strong> Investors
              </div>
              <div className="border-t py-2 px-5 mx-[-20px]">
                <strong>${deal?.price_per_security ?? "0"}</strong> price per
                security
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default DealCards;
