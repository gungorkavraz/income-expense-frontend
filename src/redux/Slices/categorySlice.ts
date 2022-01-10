import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CategoryService from 'services/categoryService';

const categoryService = new CategoryService();

interface categoryValues {
  CategoryInformation: {
    name: string;
    is_income: boolean;
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

export const getCategoriesAsync = createAsyncThunk(
  'categories/getCategoriesAsync',
  async () => {
    const response = await categoryService.getCategories();
    const data = response.data;
    if (data.success) {
      return {
        Success: data.success,
        Categories: data.categories,
      };
    } else {
      return {
        Success: data.success,
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
      state.push(action.payload.Category);
    });
    builder.addCase(getCategoriesAsync.fulfilled, (state, action) => {
      return action.payload.Categories;
    });
  },
});

export default categorySlice.reducer;
