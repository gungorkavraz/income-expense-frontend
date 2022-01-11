import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import TransactionService from 'services/transactionService';

const transactionService = new TransactionService();

interface TransactionInformation {
  TransactionInformation: {
    category_id: number;
    process_date: Date;
    amount: number;
    currency: string;
    description?: string;
  };
}

interface transactionId {
  TransactionId: any;
}

export const addTransactionAsync = createAsyncThunk(
  'categoritransactionses/addTransactionAsync',
  async (payload: TransactionInformation) => {
    const response = await transactionService.addTransaction(
      payload.TransactionInformation
    );
    const data = await response.data;

    if (data.success) {
      return {
        Success: true,
        Transaction: data.transaction,
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
  'transactions/getTransactionsAsync',
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

export const deleteTransactionAsync = createAsyncThunk(
  'transactions/deleteTransactionAsync',
  async (payload: transactionId) => {
    const response = await transactionService.deleteTransaction(
      payload.TransactionId
    );
    const data = response.data;
    if (data.success) {
      return {
        Success: data.success,
        Message: data.message,
        DeletedTransactionId: payload.TransactionId,
      };
    } else {
      return {
        Success: data.success,
      };
    }
  }
);

export const getTransactionForUpdate = createAsyncThunk(
  'transactions/getTransactionForUpdate/:id',
  async (payload: transactionId) => {
    const response = await transactionService.getTransactionForUpdate(
      payload.TransactionId
    );
    const data = response.data;

    if (data.success) {
      return {
        Success: 200,
        TransactionToUpdate: data.transactionToUpdate,
        Message: '',
      };
    } else {
      return {
        Success: 200,
        Message: data.message,
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
      console.log('addT');
      state.push(action.payload.Transaction);
    });
    builder.addCase(getTransactionsAsync.fulfilled, (state, action) => {
      return action.payload.Transactions;
    });
    builder.addCase(deleteTransactionAsync.fulfilled, (state, action) => {
      return state.filter(
        (transaction: any) =>
          transaction.id !== action.payload.DeletedTransactionId
      );
    });
    builder.addCase(getTransactionForUpdate.fulfilled, (state, action) => {
      // console.log('action.payload.TransactionToUpdate.id');
      // console.log(action.payload.TransactionToUpdate[0].id);
      // return state.filter(
      //   (transaction: any) =>
      //     transaction.id === action.payload.TransactionToUpdate[0].id
      // );
    });
  },
});

export default transactionSlice.reducer;
