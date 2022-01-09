import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from 'services/categoryService';

const categoryService = new CategoryService();

interface categoryValues {
  CategoryInformation: {
    categoryName: string;
    isIncome: boolean;
  };
}

export const addCategoryAsync = createAsyncThunk(
  'categories/addCategoryAsync',
  async (payload: categoryValues) => {
    const response = await categoryService.addCategory(
      payload.CategoryInformation
    );
    const data = await response.data;

    if (data.success) {
      return {
        Success: true,
        Category: data.category,
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

const categorySlice = createSlice({
  name: 'categories',
  initialState: Array,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCategoryAsync.fulfilled, (state, action) => {
      console.log('category add fullfilled');
      state.push(action.payload.Category);
    });
  },
});

export default categorySlice.reducer;
