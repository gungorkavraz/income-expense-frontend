import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TransactionService from 'services/transactionService';

const transactionService = new TransactionService();

interface TransactionInformation {
  TransactionInformation: {
    category_id: number;
    process_date: Date;
    amount: number;
    currency: string;
    description: string;
  };
}

export const addTransactionAsync = createAsyncThunk(
  'categories/addCategoryAsync',
  async (payload: TransactionInformation) => {
    const response = await transactionService.addIncomeOrExpense(
      payload.TransactionInformation
    );
    const data = await response.data;

    if (data.success) {
      return {
        Success: true,
        IncomeOrExpense: data.transaction,
        Message: data.Message,
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

export const getTransactionAsync = createAsyncThunk(
  'categories/getCategoriesAsync',
  async () => {
    const response = await transactionService.getIncomesOrExpenses();
    const data = response.data;
    if (data.success) {
      return {
        Success: data.success,
        IncomesOrExpenses: data.transactions,
      };
    } else {
      return {
        Success: data.success,
      };
    }
  }
);

const incomeOrExpenseSlice = createSlice({
  name: 'incomeOrExpenses',
  initialState: Array,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTransactionAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    // builder.addCase(getTransactionsAsync.fulfilled, (state, action) => {
    //   return action.payload.IncomesOrExpenses;
    // });
  },
});

export default incomeOrExpenseSlice.reducer;
