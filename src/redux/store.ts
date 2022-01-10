import { configureStore } from '@reduxjs/toolkit';

import userOperationReducer from './Slices/userOperationSlice';
import categoryReducer from './Slices/categorySlice';
import transactionReducer from './Slices/transactionSlice';

const store = configureStore({
  reducer: {
    userOperations: userOperationReducer,
    categories: categoryReducer,
    incomeOrExpenses: transactionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
