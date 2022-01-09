import { configureStore } from '@reduxjs/toolkit';

import userOperationReducer from './Slices/userOperationSlice';
import categoryReducer from './Slices/categorySlice';

const store = configureStore({
  reducer: {
    userOperations: userOperationReducer,
    categories: categoryReducer,
  },
});

export default store;
