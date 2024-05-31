import React, { useState } from 'react'
import CustomSwitch from '../../shared/components/Switch/switch'
import { Button } from '../../shared/components/Button'
import { SwitchAbleBtn } from '../../shared/components/SwitchableBtn/switchableBtn'
import { useLocation, useNavigate } from 'react-router-dom'

function Suitability() {

    const stateProps = useLocation()
    const navigate = useNavigate()
    const [answers, setAnswers] = useState([])

    const question = [
        {
            question: "Are you currently employed?",
            answer: null,
            value: "employment"
        },
        {
            question: "Do you have any dependents?",
            answer: null,
            value: "dependents"
        },
        {
            question: "Investment objectives",
            answer: null,
            text: "I understand the securities I am investing in are speculative, and market speculation is part of my investment objectives.",
            value: "investment_objectives"
        },
        {
            question: "Investment experience",
            answer: null,
            value: "investment_experience",
            text: "I have experience investing in thinly-traded securities and I understand that such investments are subject to high risk and liquidity issues."
        },
        {
            question: "Investable assets",
            answer: null,
            value: "Investable_assets",
            text: "I am looking to invest less than 5% of my total investable assets in speculative investments."
        },
    ]

    return (
        <div className='flex flex-col justify-center sm:w-[35rem] px-5 sm:px-0 md:w-[45rem] mx-auto my-12'>
            <div className='mb-20 md:w-[75%] sm:mx-auto'>
                <div className='text-center space-y-4'>
                    <div className='text-3xl xxs:text-4xl md:text-h1 font-extrabold '>Confirm suitability</div>
                    <div className='text-lg md:text-[1.7rem] md:leading-9 text-gray-500'>
                        Please confirm these items to make sure this investment suits your goals
                    </div>
                </div>
            </div>
            {question.map((res) => {
                return (
                    <div className='my-5'>
                        <div className='flex w-full items-center justify-between border-b pb-10'>
                            <div className='space-y-2 w-[62%] hidden sm:block'>
                                <div className='font-bold text-xl sm:text-[25px] mt-0.5'>{res.question}</div>
                                <div className='font-normal text-xl'>{res.text}</div>
                            </div>
                            <div className='w-[40%] sm:flex justify-end hidden'>
                                <SwitchAbleBtn yinc={"bg-[#00cc17]"}
                                    ninc={"bg-[#ff6a73]"}
                                    getValue={(value) => {
                                        const label = res.value
                                        return (
                                            setAnswers({
                                                ...answers,
                                                [label]: value,
                                            })
                                        )
                                    }}
                                    value={answers?.[res.value]}
                                />
                            </div>

                            <div className='sm:hidden w-full'>
                                <div className='flex justify-between'>
                                    <div className='font-bold my-auto text-lg xxs:text-xl sm:text-[25px] w-[50%] xxs:w-[60%]'>{res.question}</div>
                                    <div className='xxs:w-[40%] w-[50%] flex justify-end'><SwitchAbleBtn yinc={"#00cc17"} /></div>
                                </div>
                                <div className='font-normal mt-1 xs:mt-0 text-lg sm:text-xl'>{res.text}</div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
            <div className='flex space-x-5 items-center text-lg sm:text-xl mt-5'>
                <div className='mt-0.5'>
                    <CustomSwitch
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        size="lg" />
                </div>
                <div>I have received, reviewed and understand the <a href='#' >Form CRS</a></div>
            </div>
            <div className='flex space-x-5 items-center text-lg sm:text-xl mt-10'>
                <div className='mt-0.5'>
                    <CustomSwitch
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        size="lg" />
                </div>
                <div>I have received, reviewed and understand the  and have had an opportunity to .
                    Continue</div>
            </div>
            <div className='w-full md:w-[20rem] mx-auto mt-[5rem]'><Button label="Continue" onClick={() => { navigate(`/investment/${stateProps.state.title}`, { state: stateProps.state }) }} /></div>
            <div className='text-center text-sm my-10 md:w-[40rem] m-auto'>
                Pursuant to Regulation Best Interest, as a registered broker dealer, we are required to take steps to verify that the investments you make are in your best interest.
            </div>
        </div>
    )
}

export default Suitability
