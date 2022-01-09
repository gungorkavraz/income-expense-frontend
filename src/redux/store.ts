import { configureStore } from '@reduxjs/toolkit';

import userOperationReducer from './Slices/userOperationSlice';

const store = configureStore({
  reducer: {
    userOperations: userOperationReducer,
  },
});

export default store;
