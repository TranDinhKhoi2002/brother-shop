import Cookies from 'js-cookie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authServices from '@/services/authRequests';
import * as customerServices from '@/services/customerRequests';

const initialState = {
  currentUser: undefined,
  isAuthenticated: false,
};

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const response = await authServices.getUserProfile();
  return response;
});

export const fetchUserSignup = createAsyncThunk('auth/fetchUserSignup', async (formData) => {
  const response = await authServices.signup(formData);
  return response;
});

export const fetchUserLogin = createAsyncThunk('auth/fetchUserLogin', async (formData) => {
  const response = await authServices.login(formData);
  return response;
});

export const fetchSocialMediaUserLogin = createAsyncThunk('auth/fetchSocialMediaUserLogin', async (data) => {
  const response = await authServices.loginWithSocialMediaAccount(data);
  return response;
});

export const fetchVerifyUser = createAsyncThunk('auth/fetchVerifyUser', async () => {
  const response = await customerServices.updateUserIsVerified();
  return response;
});

export const fetchUpdateProfile = createAsyncThunk('auth/fetchUpdateProfile', async (data) => {
  const response = await customerServices.updateProfile(data);
  return response;
});

export const fetchAddAddress = createAsyncThunk('auth/fetchAddAddress', async (data) => {
  const response = await customerServices.addAddress(data);
  return response;
});

export const fetchEditAddress = createAsyncThunk('auth/fetchEditAddress', async (data) => {
  const response = await customerServices.editAddress(data);
  return response;
});

export const fetchRemoveAddress = createAsyncThunk('auth/fetchRemoveAddress', async (data) => {
  const response = await customerServices.removeAddress(data);
  return response;
});

export const fetchUpdateAddressToDefault = createAsyncThunk('auth/fetchUpdateAddressToDefault', async (data) => {
  const response = await customerServices.updateAddressToDefault(data);
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state, action) {
      Cookies.remove('token');
      Cookies.remove('accountId');

      state.currentUser = undefined;
      state.isAuthenticated = false;
    },
    setAuth(state, action) {
      const { user } = action.payload;

      state.currentUser = user;
      state.isAuthenticated = true;
    },
    updateOrders(state, action) {
      state.currentUser.orders = action.payload.updatedOrders;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      const { success, user } = payload;

      if (success) {
        state.currentUser = user;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, { payload }) => {
      const { success, token, user, accountId } = payload;

      if (success) {
        const remainingMilliseconds = 24 * 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        Cookies.set('token', token, { expires: expiryDate });
        Cookies.set('accountId', accountId);

        state.currentUser = user;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(fetchUserSignup.fulfilled, (state, { payload }) => {
      const { success } = payload;

      if (success) {
        Cookies.remove('token');
      }
    });
    builder.addCase(fetchSocialMediaUserLogin.fulfilled, (state, { payload }) => {
      const { success, token, user } = payload;

      if (success) {
        const remainingMilliseconds = 24 * 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        Cookies.set('token', token, { expires: expiryDate });

        state.currentUser = user;
        state.isAuthenticated = true;
      }
    });
    builder.addCase(fetchVerifyUser.fulfilled, (state, { payload }) => {
      state.currentUser.verified = true;
    });
    builder.addCase(fetchUpdateProfile.fulfilled, (state, { payload }) => {
      const { updatedCustomer } = payload;
      state.currentUser = updatedCustomer;
    });
    builder.addCase(fetchAddAddress.fulfilled, (state, { payload }) => {
      const { updatedAddresses } = payload;
      if (updatedAddresses) {
        state.currentUser.address = updatedAddresses;
      }
    });
    builder.addCase(fetchEditAddress.fulfilled, (state, { payload }) => {
      const { updatedAddresses } = payload;
      if (updatedAddresses) {
        state.currentUser.address = updatedAddresses;
      }
    });
    builder.addCase(fetchRemoveAddress.fulfilled, (state, { payload }) => {
      const { updatedAddresses } = payload;
      if (updatedAddresses) {
        state.currentUser.address = updatedAddresses;
      }
    });
    builder.addCase(fetchUpdateAddressToDefault.fulfilled, (state, { payload }) => {
      const { updatedAddresses } = payload;
      if (updatedAddresses) {
        state.currentUser.address = updatedAddresses;
      }
    });
  },
});

export const { logout, setAuth, updateOrders } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
