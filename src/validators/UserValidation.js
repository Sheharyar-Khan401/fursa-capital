import { yupResolver } from "@hookform/resolvers/yup";
import { globalVariables } from "../helper/globalVariables";
import * as Yup from "yup";

const mobileRegex =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const emailRegex =
  /^([\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*)@((?:[\dA-Za-z](?:[\dA-Za-z-]*[\dA-Za-z])?\.)+[\dA-Za-z](?:[\dA-Za-z-]*[\dA-Za-z])?)$/;
const passwordRegexSpecial =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// const nameRegex = /^(?!\s)[A-Za-z][A-Za-z\s]*[\.]{0,1}[A-Za-z\s]*$/;
// const firstSpace = /^(?!\s).*/;

// const passwordRegex =
// 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const signupResolver = yupResolver(
  Yup.object().shape({
    firstName: Yup.string().required(globalVariables.firstnameRequired),
    lastName: Yup.string().required(globalVariables.lastnameRequired),
    email: Yup.string()
      .required(globalVariables.emailRequired)
      .matches(emailRegex, globalVariables.invalidEmail),
    password: Yup.string()
      .min(8, globalVariables.mustHaveAtlease)
      .max(20)
      .required(globalVariables.passwordRequired),
    confirmPassword: Yup.string()
    .min(8, globalVariables.mustHaveAtlease)
    .max(20)
    .oneOf([Yup.ref('password'), null], globalVariables.passwordMatch)
    .required(globalVariables.passwordRequired)
  })
);

export const DetailResolver = yupResolver(
  Yup.object().shape({
    // selectedTitle: Yup.string().required(globalVariables.titleRequired),
    // DateofBirth: Yup.string().required(globalVariables.DateOfBirth),
    // Country: Yup.string().required(globalVariables.Residence),
    // Citizenship: Yup.string().required(globalVariables.citizenshipValidation),
    phoneNumber: Yup.string().required(globalVariables.detailPhoneNumber),
    individualSSN: Yup.string().required(globalVariables.SSNValidation),
  })
);

export const companyResolver = yupResolver(
  Yup.object().shape({
    companyName: Yup.string().required(
      globalVariables.companyNameLabelvalidation
    ),
    companyEIN: Yup.string().required(globalVariables.companyEINvalidation),
    companyphoneNumber: Yup.string().required(
      globalVariables.companyPhoneNumbervalidation
    ),
    companyEmail: Yup.string()
      .required(globalVariables.companyEmailvalidation)
      .matches(emailRegex, globalVariables.invalidEmail),
    companyWebsiteUrl: Yup.string()
      .required(globalVariables.companyWebsitevalidation)
      .matches(
        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        globalVariables.invalidWebsite
      ),
  })
);

export const AddressResolver = yupResolver(
  Yup.object().shape({
    address1: Yup.string().required(globalVariables.addressLine1Req),
    address2: Yup.string().required(globalVariables.addressLine2Req),
    city: Yup.string().required(globalVariables.cityReq),
    zip: Yup.string().required(globalVariables.zipReq),
  })
);

export const loginResolver = yupResolver(
  Yup.object().shape({
    email: Yup.string()
      .required(globalVariables.emailRequired)
      .matches(
        /^([\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*)@((?:[\dA-Za-z](?:[\dA-Za-z-]*[\dA-Za-z])?\.)+[\dA-Za-z](?:[\dA-Za-z-]*[\dA-Za-z])?)$/,
        globalVariables.invalidEmail
      ),
    password: Yup.string()
      .min(8, globalVariables.mustHaveAtlease)
      .max(20)
      .required(globalVariables.passwordRequired),
  })
);
