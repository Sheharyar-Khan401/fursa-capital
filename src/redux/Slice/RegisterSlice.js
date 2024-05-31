import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: {},
  basicDetails: {},
  addressDetails: {},
  companyDetails: {},
  logedIn: false
}

export const RegisterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setRegisterValues: (state, action) => {
      state.userInfo = action.payload
      state.logedIn = true
    },
    setBasicDetails: (state, action) => {
      state.basicDetails = action.payload
    },
    setAddressDetails: (state, action) => {
      state.addressDetails = action.payload
    },
    setCompanyDetails: (state, action) => {
      state.companyDetails = action.payload
    },
    clearUserInfo: (state, action) => {
      state.logedIn = false
    },
    clearUserData: (state, action) => {
      state.basicDetails = {}
      state.companyDetails = {}
      state.addressDetails = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRegisterValues, setBasicDetails, setAddressDetails, setCompanyDetails, clearUserInfo, clearUserData } = RegisterSlice.actions

export default RegisterSlice.reducer