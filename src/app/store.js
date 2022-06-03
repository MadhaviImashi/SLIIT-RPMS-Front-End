import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginSlice';
import groupReducer from '../reducers/groupSlice';

export default configureStore({
  reducer: {
    login:loginReducer,
    group:groupReducer
  },
})