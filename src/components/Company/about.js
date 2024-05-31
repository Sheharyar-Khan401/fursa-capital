import React from 'react'

function AboutUs({
    name,
    location,
    us_incorporated,
    companySize,
    websiteUrl,
    industry,
    companyDescription
}) {
    return (
        <>
            {companyDescription && <div className='font-medium bg-[#f7f7f7] rounded-lg px-5 py-5 text-xl'>{companyDescription}</div>}
            <div className='md:flex gap-5 sm:gap-28 md:gap-16 lg:gap-32 xl:gap-44 mt-8'>
                <div className='space-y-5 w-full md:w-1/2'>
                    <div className='space-y-5 border-b md:border-none pb-4'>
                        <div className='text-xl sm:text-[1.8rem] font-semibold whitespace-nowrap'>Legal Company Name</div>
                        <div className='text-xl sm:text-[1.5rem] text-[#58B5AC] font-medium'>{name}</div>
                    </div>
                    <div className='space-y-4 border-b md:border-none pb-4'>
                        <div className='text-xl sm:text-[1.8rem] font-semibold'>Location</div>
                        <div className='text-xl sm:text-[1.5rem] text-[#58B5AC] font-medium'>{location}</div>
                    </div>
                    {companySize && <div className='space-y-4 border-b md:border-none pb-4'>
                        <div className='text-xl sm:text-[1.8rem] font-semibold'>Number of Employees</div>
                        <div className='text-xl sm:text-[1.5rem] text-[#58B5AC] font-medium'>{companySize} Employees</div>
                    </div>}
                </div>

                <div className='space-y-5 w-full md:w-1/2'>
                    <div className='space-y-4 border-b md:border-none pb-4'>
                        <div className='text-xl sm:text-[1.8rem] font-semibold'>Incorporated in US</div>
                        <div className='text-xl sm:text-[1.5rem] text-[#58B5AC] font-medium'>{us_incorporated ? "Yes" : "No"}</div>
                    </div>
                    {industry && <div className='space-y-4 border-b md:border-none pb-4'>
                        <div className='text-xl sm:text-[1.8rem] font-semibold'>Industry</div>
                        <div className='text-xl sm:text-[1.5rem] text-[#58B5AC] font-medium'>{industry}</div>
                    </div>}
                    <div className='space-y-4 border-b md:border-none pb-4'>
                        <div className='text-xl sm:text-[1.8rem] font-semibold'>Website Url</div>
                        <div className='break-words'>
                            <a href={websiteUrl} target='_blank' className='text-xl sm:text-[1.5rem] text-[#58B5AC] font-medium'>{websiteUrl}</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs
