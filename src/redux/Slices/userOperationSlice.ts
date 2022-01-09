import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from 'services/userService';

const userService = new UserService();

interface registerUserValues {
  UserInformation: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
}

interface loginUserValues {
  UserInformation: {
    email: string;
    password: string;
  };
}
export const registerUserAsync = createAsyncThunk(
  'users/registerUserAsync',
  async (payload: registerUserValues) => {
    const response = await userService.register(payload.UserInformation);
    const data = await response.data;

    if (data.success) {
      return {
        Success: true,
        User: data.user,
        Token: data.token,
        Message: data.message,
      };
    } else {
      return {
        Success: false,
        Message: data.message,
        Errors: data?.errors,
      };
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'users/loginUserAsync',
  async (payload: loginUserValues) => {
    const response = await userService.login(payload.UserInformation);
    const data = response.data;

    if (data.success) {
      return {
        Success: true,
        User: data.user,
        Token: data.token,
      };
    } else {
      console.log('successfalse');
    }
  }
);

export const getAuthenticatedUserAsync = createAsyncThunk(
  'users/getAuthenticatedUserAsync',
  async () => {
    const response = await userService.getAuthenticatedUser();
    const data = await response.data;
    if (data.success) {
      return {
        Success: true,
        User: data.user,
      };
    } else {
      return {
        Success: false,
      };
    }
  }
);

const userOperationSlice = createSlice({
  name: 'userOperations',
  initialState: {
    authenticatedUser: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {});
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      localStorage.setItem('accessToken', action.payload?.Token);
      state.authenticatedUser = action.payload?.User;
    });
    builder.addCase(getAuthenticatedUserAsync.fulfilled, (state, action) => {
      console.log('getAuthenticatedUserFulfilled');
      console.log(action.payload);
      state.authenticatedUser = action.payload?.User;
    });
  },
});

export default userOperationSlice.reducer;
