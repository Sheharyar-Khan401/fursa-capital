import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, userInfo: null },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    setUser(state, action){
      state.userInfo = action.payload
    }
  },
});

export const { setToken, clearToken, setUser } = authSlice.actions;
export default authSlice.reducer;
