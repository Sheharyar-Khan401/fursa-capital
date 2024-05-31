import { useState } from "react";
import BasicDetails from "./BasicDetail";
import AddressDetails from "./AddressDetails";
// import { AddressDetails } from "./AddressDetails";
import CompanyDetails from "./OrganizationInfo";

export const Details = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [saveAddressDetails, setSaveAddressDetails] = useState(false);
  const [saveCompanyDetails, setSaveCompanyDetails] = useState(false);
  const [userId , setUserId] = useState('');

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === 0) {
    return (
      <BasicDetails
        // setUserId = {(id) => setUserId(id)}
        onTapNext={(id) => {
          setSaveAddressDetails(true);
          setSaveCompanyDetails(false);
          onChangePage(1);
          setUserId(id);
        }}
      />
    );
  }
  if (currentPage === 1) {
    return (
      <AddressDetails
        onTapPrevious={() => onChangePage(0)}
        saveTrialDetails={saveAddressDetails}
        userId = {userId}
        // setUserId = {(id) => setUserId(id)}
        onTapNext={() => {
          setSaveAddressDetails(false);
          onChangePage(2);
          setSaveCompanyDetails(true);
        }}
      />
    );
  }
  return (
    <CompanyDetails
      currentPage={currentPage}
      saveSearchDetails={saveCompanyDetails}
      userId = {userId}
      onTapPrevious={() => {
        setSaveCompanyDetails(false);
        setSaveAddressDetails(true);
        onChangePage(1);
      }}
    />
  );
};
