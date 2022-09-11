import { createSlice } from '@reduxjs/toolkit';
import authOperations from './auth-operations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      balance: 0,
    },
    googleEmail: null,
    token: null,
    isLoggedIn: false,
    isFetchingCurrentUser: false,
  },
  extraReducers: {
    [authOperations.register.fulfilled](state, { payload }) {
      state.user = payload.user;
      // state.token = payload.token;
      // state.isLoggedIn = true;
    },
    [authOperations.googleApi.fulfilled](state, { payload }) {
      state.token = payload.token;
      state.googleEmail = payload.email;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logIn.rejected](state) {
      state.user = { email: null, balance: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.logOut.fulfilled](state) {
      state.user = { email: null, balance: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
    },
    [authOperations.updateBalance.fulfilled](state, { payload }) {
      state.user = payload.data;
    },
  },
});

export default authSlice.reducer;
