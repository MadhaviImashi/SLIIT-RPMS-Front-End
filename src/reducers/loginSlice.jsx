import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    token: '',
    userID:'',
    type:'',
    email:'',
    name:'',
    loginID:''
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userID = action.payload.userID;
      state.type = action.payload.type;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.loginID = action.payload.loginID;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.token = '';
      state.email = '';
      state.userID = '';
      state.type = '';
      state.name = '';
      state.loginID = '';
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
