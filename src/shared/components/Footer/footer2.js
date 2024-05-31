import React from "react";
import {
    faceBookLogo,
    fursaLogo,
    instaLogo,
    linkedinLogo,
    twitterLogo,
} from "../../../helper/images";

function Footer2() {
    const links = [
        {
            key: 1,
            label: "T&C",
            route: "https://fursacapital.com/about",
        },
        {
            key: 2,
            label: "FAQ",
            route: "https://fursacapital.com/faq",
        },
        {
            key: 3,
            label: "Privacy Policy",
            route: "https://fursacapital.com/privacy-policy",
        },
        {
            key: 4,
            label: "Risk Warning",
            route: "https://fursacapital.com/contact-us",
        },
        {
            key: 5,
            label: "Education Material",
            route: "https://fursacapital.com/education-materials",
        },
    ];

    return (
        <div className="bg-[#161d2d] px-5 sm:px-[7.5%] lg:px-[5%] xl:px-[7.5%] bottom-0">
            <div className="justify-between flex flex-wrap lg:flex-nowrap pt-14 pb-20 ">
                <div className="flex items-center w-full lg:w-[30%] xl:w-[25%] justify-center space-x-1 sm:space-x-4 mt-10 sm:mt-0 order-3 lg:order-1 lg:block lg:space-y-3">
                    <img className="h-8 md:h-[3.5rem]" src={fursaLogo} />
                    <div className="text-[hsla(0,0%,100%,.5)] text-center md:text-left text-xs sm:text-sm md:text-base">
                        Copyright © 2022 Fursa Capital. All Rights Reserved
                    </div>
                </div>

                <div className="flex order-1 lg:order-2 sm:w-full lg:w-auto justify-center sm:justify-between lg:justify-normal sm:flex-row flex-col flex-wrap gap-4 md:gap-6 xl:gap-12">
                    {links.map((res) => {
                        return (
                            <div
                                role="link"
                                onClick={() => window.open(res.route, "_blank")}
                                className="text-white flex flex-col justify-center cursor-pointer"
                            >
                                {res.label}
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center sm:mb-2 sm:mt-5 lg:my-0 order-2 lg:order-3 sm:w-full lg:w-auto sm:flex-row flex-col flex-wrap lg:flex-nowrap gap-4 md:gap-[5%] lg:gap-4 xl:gap-10 items-center">
                    <img
                        onClick={() =>
                            window.open("https://www.facebook.com/fursa.capital/", "_blank")
                        }
                        className="aspect-square w-[1.8rem] h-[1.8rem] opacity-70 hover:opacity-100"
                        src={faceBookLogo}
                    />
                    <img
                        onClick={() =>
                            window.open("https://twitter.com/fursa_capital", "_blank")
                        }
                        className="aspect-square w-6 h-6 opacity-70 hover:opacity-100"
                        src={twitterLogo}
                    />
                    <img
                        onClick={() =>
                            window.open(
                                "https://www.linkedin.com/company/fursacapital",
                                "_blank"
                            )
                        }
                        className="aspect-square w-6 h-6 opacity-70 hover:opacity-100"
                        src={linkedinLogo}
                    />
                </div>
            </div>
            <hr className="border-gray-600 mb-10" />
            <div className="font-bold text-white">IMPORTANT LEGAL NOTICE:</div>
            <p className="text-[hsla(0,0%,100%,.5)] py-6">
                Halal Franchise, LLC or FURSA. is a funding portal ("Funding Portal")
                registered{" "}
                <u
                    className="font-bold cursor-pointer"
                    onClick={() => window.open("https://www.sec.gov/", "_blank")}
                >
                    here
                </u>{" "}
                with the US Securities and Exchange Commission (SEC) and{" "}
                <u
                    className="font-bold cursor-pointer"
                    onClick={() => window.open("https://www.finra.org/#/", "_blank")}
                >
                    here
                </u>{" "}
                as a member of the Financial Industry Regulatory Authority (FINRA). The
                Funding Portal only permits the posting of securities offerings made
                pursuant to Section 4(a)(6) of the Securities Act of 1933, as amended,
                in accordance with the Title III of the Jumpstart Our Business Startups
                Act of 2012, including its adopting release and subsequent guidance.
                Investors must acknowledge and accept the high risks associated with
                investing in private securities offerings, include holding your
                investment for periods of many years with limited ability to resell,
                limited access to periodic reporting, and losing your entire investment.
                FURSA is only required to conduct limited due diligence on each offering
                and does not in any way give investment advice, provide analysis or
                recommendations regarding any offering posted on the Funding Portal.
                Past performance is not indicative of future performance. All investors
                should make their own determination of whether or not to make any
                investment in an offering, based on their own independent evaluation and
                analysis and after consulting with their financial, tax and investment
                advisors. Prior to making any investment, you will be required to
                demonstrate your understanding of the speculative nature of investing in
                such private securities. The securities presented on this Funding Portal
                can only be marketed in jurisdictions where public solicitation of
                offerings are permitted; it is solely your responsibility to comply with
                the laws and regulations of your country of residence. You are strongly
                advised to consult your legal, tax and financial advisor before
                investing.
                <br />
                <div className="my-5">
                    Additional information about companies fundraising on the website can
                    be found by searching{" "}
                    <u
                        className="font-bold cursor-pointer"
                        onClick={() =>
                            window.open(
                                "https://www.sec.gov/edgar/searchedgar/companysearch.html",
                                "_blank"
                            )
                        }
                    >
                        EDGAR
                    </u>{" "}
                    database, or the offering documentation located on the website when
                    the offering does not require an EDGAR filing.
                </div>
                <div className="">
                    By accessing the Funding Portal and any pages on the Funding Portal,
                    you agree to be bound by the{" "}
                    <span
                        className="font-bold cursor-pointer underline"
                        onClick={() =>
                            window.open("https://fursacapital.com/terms", "_blank")
                        }
                    >
                        Terms of Use
                    </span>{" "}
                    and{" "}
                    <u
                        className="font-bold cursor-pointer"
                        onClick={() =>
                            window.open("https://fursacapital.com/privacy-policy", "_blank")
                        }
                    >
                        Privacy Policy
                    </u>
                    , as may be amended from time to time.
                </div>
                <div className="mt-5">
                    *All references to Halal investments, ethics or ethical investments
                    connotes compliance with Islamic Finance principles on investment
                    activities in reference to the elimination of interest.
                </div>
                <br />
                **Digital wallet refers to a self-directed custodial account that is
                created when an Investor creates an account on our platform. Users may
                also request withdrawal of funds directly from Prime Trust at{" "}
                <u
                    className="font-bold cursor-pointer"
                    onClick={() => {
                        window.location.href = `mailto:info@primetrust.com`;
                    }}
                >
                    info@primetrust.com
                </u>
                <br />
                <div className="my-5 font-bold">
                    IN MAKING AN INVESTMENT DECISION, INVESTORS MUST RELY ON THEIR OWN
                    EXAMINATION OF THE ISSUER AND THE TERMS OF THE OFFERING, INCLUDING THE
                    MERITS AND RISKS INVOLVED. INVESTMENTS ON FURSA.CAPITAL ARE
                    SPECULATIVE, ILLIQUID, AND INVOLVE A HIGH DEGREE OF RISK, INCLUDING
                    THE POSSIBLE LOSS OF YOUR ENTIRE INVESTMENT
                </div>
            </p>
        </div>
    );
}

export default Footer2;
