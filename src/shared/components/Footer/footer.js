import React from "react";
import {
    faceBookLogo,
    fursaLogo,
    instaLogo,
    linkedinLogo,
    twitterLogo,
} from "../../../helper/images";

function Footer() {
    const forInvestours = [
        {
            key: 1,
            label: "T&C",
            route: "https://fursacapital.com/terms",
        },
        {
            key: 2,
            label: "How it works",
            route: "https://fursacapital.com/how-it-works-invest",
        },
        {
            key: 3,
            label: "FAQ",
            route: "/#",
        },
        {
            key: 4,
            label: "Risks",
            route: "/#",
        },
        {
            key: 5,
            label: "Privacy Policy",
            route: "/#",
        },
    ];

    const forStartups = [
        {
            key: 1,
            label: "Why raise",
            route: "/#",
        },
        {
            key: 2,
            label: "Learn",
            route: "/#",
        },
        {
            key: 3,
            label: "FAQ",
            route: "/#",
        },
        {
            key: 4,
            label: "Instruments",
            route: "/#",
        },
    ];

    const Crypto = [
        {
            key: 1,
            label: "For investors",
            route: "/#",
        },
        {
            key: 2,
            label: "For companies",
            route: "/#",
        },
        {
            key: 3,
            label: "How it works",
            route: "/#",
        },
        {
            key: 4,
            label: "Token DPA",
            route: "/#",
        },
    ];

    const Company = [
        {
            key: 1,
            label: "About",
            route: "https://fursacapital.com/about",
        },
        {
            key: 2,
            label: "Journal",
            route: "/#",
        },
        {
            key: 3,
            label: "Events",
            route: "/#",
        },
        {
            key: 4,
            label: "Contact",
            route: "https://fursacapital.com/contact-us",
        },
        {
            key: 5,
            label: "We're hiring",
            route: "/#",
        },
    ];

    return (
        <div className="px-5 sm:px-[12.5%] bg-[#161d2d] bottom-0">
            <div className="gap-10 pt-14 pb-20 lg:grid flex flex-wrap justify-center grid-cols-5">
                <div className="space-y-4 w-full">
                    <img className="w-[7.5rem] h-[3.5rem]" src={fursaLogo} />
                    <div className="text-[hsla(0,0%,100%,.5)]">
                        Giving everyone access to early-stage startup investing
                    </div>
                    <div className="flex gap-3 items-center">
                        <img
                            onClick={() =>
                                window.open("https://www.facebook.com/fursa.capital/", "_blank")
                            }
                            className="aspect-square w-[1.8rem] h-[1.8rem] opacity-70 hover:opacity-100"
                            src={faceBookLogo}
                        />
                        <img
                            className="aspect-square w-6 h-6 opacity-70 hover:opacity-100"
                            src={instaLogo}
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
                                window.open("https://www.linkedin.com/company/fursacapital", "_blank")
                            }
                            className="aspect-square w-6 h-6 opacity-70 hover:opacity-100"
                            src={linkedinLogo}
                        />
                    </div>
                </div>

                <div className="space-y-2 sm:space-y-3 w-[40%] lg:w-full">
                    <div className="text-[hsla(0,0%,100%,.5)] text-lg">For investors</div>
                    <hr className="border-gray-600 my-3" />
                    {forInvestours.map((res) => (
                        <div
                            role="link"
                            onClick={() => window.open(res.route, "_blank")}
                            className="text-white font-semibold opacity-90 text-lg cursor-pointer">
                            {res.label}
                        </div>
                    ))}
                </div>

                <div className="space-y-2 sm:space-y-3 w-[40%] lg:w-full">
                    <div className="text-[hsla(0,0%,100%,.5)] text-lg">For startups</div>
                    <hr className="border-gray-600 my-3" />
                    {forStartups.map((res) => (
                        <div className="text-white font-semibold opacity-90 text-lg">
                            {res.label}
                        </div>
                    ))}
                </div>

                <div className="space-y-2 sm:space-y-3 w-[40%] lg:w-full">
                    <div className="text-[hsla(0,0%,100%,.5)] text-lg">Crypto</div>
                    <hr className="border-gray-600 my-3" />
                    {Crypto.map((res) => (
                        <div className="text-white font-semibold opacity-90 text-lg">
                            {res.label}
                        </div>
                    ))}
                </div>

                <div className="space-y-2 sm:space-y-3 w-[40%] lg:w-full">
                    <div className="text-[hsla(0,0%,100%,.5)] text-lg">Company</div>
                    <hr className="border-gray-600 my-3" />
                    {Company.map((res) => (
                        <div role="link" onClick={() => window.open(res.route, "_blank")} className="text-white font-semibold opacity-90 text-lg cursor-pointer">
                            {res.label}
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className='flex border-t border-b border-gray-600 py-6'>
                    <div className='text-white'>$ Refer a startup, get $2,500</div>
                    <div>

                    </div>
            </div> */}
        </div>
    );
}

export default Footer;
