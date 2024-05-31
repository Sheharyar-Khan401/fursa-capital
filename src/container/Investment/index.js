import { Collapse, Dropdown, Form, List, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { TextInput } from '../../shared/components/TextInput'
import CustomCheckBox from '../../shared/components/CheckBox/CustomCheckBox';
import "./styles.css"
import { Button } from '../../shared/components/Button';
import { grayCaretRight } from '../../helper/images';
import { useLocation } from 'react-router-dom';
import { useCreateDealInvestorMutation } from '../../redux/features/investor/investorApiSlice';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

function CreateInvestment({ user }) {

   const navProps = useLocation()
   console.log(navProps.state)
   const [createInvestor, result] = useCreateDealInvestorMutation()
   const [amountErr, setAmountErr] = useState(false)
   const [investorType, setInvestorType] = useState("Myself / individual")

   const items = [
      {
         key: '1',
         label: (
            <div onClick={() => setInvestorType("Myself / individual")}>
               Myself / individual
            </div>
         ),
      },
      {
         key: '2',
         label: <div onClick={() => setInvestorType("Joint Investor")}>Joint Investor</div>,
         disabled: false,
      },
      {
         key: '3',
         label: <div onClick={() => setInvestorType("Corporation")} >Corporation</div>,
         disabled: false,
      },
      {
         key: '4',
         label: <div onClick={() => setInvestorType("Trust")} >Trust</div>,
      },
   ];

   const options = [
      {
         value: 1,
         label: "Myself / individual"
      },
      {
         value: 2,
         label: "Joint Investor"
      },
      {
         value: 3,
         label: "Corporation"
      },
      {
         value: 4,
         label: "Trust"
      },
   ];

   const data = [
      `I understand that I can cancel my investment up until 04/29/24 (48 hours prior to the deal deadline)`,
      'I understand that Republic will receive a cash and securities commission as further detailed in the offering documents',
      'I understand I will not have voting rights and will grant a third-party nominee broad authority to act on my behalf.',
      'I understand I may never become an equity holder, only a beneficial owner of equity interest in the Company.',
      'I understand that investing this amount into several deals would better diversify my risk',
      'I understand that there is no guarantee of a relationship between Republic and FuelGems post-offering',
   ];

   const TermsListFooter = () => {
      return (
         <div className=''>
            <CustomCheckBox text="I have read and agree to the e-sign disclosure" />
         </div>
      )
   }

   const getItems = () => [
      {
         key: '1',
         label: <span className='text-gray-500'>When will I be charged?</span>,
         children: <p className='px-6 py-0 -mt-4'>Ex qui tempor do irure dolore deserunt laboris Lorem.</p>,
         style: { marginBottom: -10 }
      },
      {
         key: '2',
         label: <span className='text-gray-500'>So I'm only charged if funding succeeds?</span>,
         children: <p className='px-6 py-0 -mt-4'>Esse nulla non excepteur veniam ea exercitation. Sunt eiusmod cupidatat duis sunt nisi. Incididunt esse aute qui pariatur mollit.</p>,
         style: { marginBottom: -10 }
      },
      {
         key: '3',
         label: <span className='text-gray-500'>What if I want to edit my investment amount?</span>,
         children: <p className='px-6 py-0 -mt-4'>Fugiat sunt ad magna pariatur. Irure excepteur do exercitation ut nisi. Minim aliquip proident irure. Cillum eu nulla esse ad.</p>,
         style: { marginBottom: -10 }
      },
      {
         key: '4',
         label: <span className='text-gray-500'>Can I invest from my country?</span>,
         children: <p className='px-6 py-0 -mt-4'>Enim amet pariatur ipsum elit qui officia sit commodo. In sint officia occaecat. Cupidatat excepteur excepteur duis esse nisi.</p>,
         style: { marginBottom: -10 }
      },
      {
         key: '5',
         label: <span className='text-gray-500'>Can I invest from my country?</span>,
         children: <p className='px-6 py-0 -mt-4'>Enim amet pariatur ipsum elit sit commodo. In sint officia aliqua nulla occaecat. Cupidatat excepteur enim irure duis sint esse reprehenderit nisi.</p>,
         style: { marginBottom: -10 }
      },
   ];

   const submitInvestment = async (values) => {
      values["email"] = auth.currentUser.email
      const response = await createInvestor({
         id: navProps?.state?.id,
         body: values
      })
      if (response.data?.access_link) {
         window.open(response?.data?.access_link, "_blank")
      }
      await addDoc(collection(db, "investments"),
         {
            dealId: navProps?.state?.id,
            userId: user?.docId,
            businessId: navProps?.state?.issuer?.id,
         });
   }

   return (
      <div className=' sm:px-[12.5%] px-5 my-10 sm:my-12'>
         <div className='flex items-center justify-between'>
            <div className='text-3xl md:leading-tight md:text-h1 font-extrabold md:w-[75%]'>Invest in {navProps.state?.title}</div>
            <div className='w-[25%] hidden md:block'>
               <Select
                  size='large'
                  style={{
                     width: '100%',
                  }}
                  defaultValue={"Myself / individual"}
                  // onChange={handleChange}
                  options={options}
               />
            </div>
         </div>
         <hr className="mt-8" />
         <div className='md:flex justify-between'>
            <div className="md:w-[55%]">
               <Form layout="vertical" className='my-8 md:my-16 space-y-10' onFinish={submitInvestment}>
                  <div className='w-full'>
                     <Form.Item
                        name={'investment_value'}
                        label={
                           <div className='text-2xl font-bold'>
                              Investment amount <br />
                           </div>
                        }
                        className='my-5'
                     >
                        <TextInput prefix={"$"} errorMsg={amountErr} className="w-full" placeholder="0.00" />
                     </Form.Item>
                     <div className='text-gray-500 text-base'>
                        You are investing as {investorType}
                        <Dropdown
                           menu={{
                              items,
                           }}
                           trigger="click"
                        >
                           <span className='mx-2 text-gray-600 underline-offset-4 underline' role='button' onClick={(e) => e.preventDefault()}>
                              Change
                           </span>
                        </Dropdown>
                     </div>
                  </div>
                  <div className={`space-y-5 customFooter`}>
                     <div className='font-bold text-2xl'>Terms</div>
                     <List
                        className='overflow-hidden'
                        footer={TermsListFooter()}
                        bordered
                        dataSource={data}
                        renderItem={(item) => (
                           <List.Item>
                              {item}
                           </List.Item>
                        )}
                     />
                  </div>
                  <div className='my-16'>
                     <Button loading={result.isLoading} HTMLTYPE="submit" label="Confirm investment" />
                  </div>
               </Form>
            </div>
            <div className='md:my-16'>
               <div className='font-semibold text-xl ml-5'>How it works</div>
               <Collapse
                  ghost
                  className='md:max-w-[15rem]'
                  size='middle'
                  bordered={false}
                  expandIcon={({ isActive }) => <img src={grayCaretRight} className={`${isActive && "rotate-90"} w-2.5 h-2.5 mt-0.5`} />}
                  items={getItems()}
               />
            </div>
         </div>
      </div>
   )
}

export default CreateInvestment
