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
  'categories/addTransactionAsync',
  async (payload: TransactionInformation) => {
    const response = await transactionService.addTransaction(
      payload.TransactionInformation
    );
    const data = await response.data;

    if (data.success) {
      return {
        Success: true,
        IncomeOrExpense: data.transaction,
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

export const getTransactionsAsync = createAsyncThunk(
  'categories/getTransactionsAsync',
  async () => {
    const response = await transactionService.getTransactions();
    const data = response.data;
    if (data.success) {
      return {
        Success: data.success,
        Transactions: data.transactions,
      };
    } else {
      return {
        Success: data.success,
      };
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: Array,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTransactionAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(getTransactionsAsync.fulfilled, (state, action) => {
      return action.payload.Transactions;
    });
  },
});

export default transactionSlice.reducer;
