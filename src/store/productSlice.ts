import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product, ProductsState} from '../types/product';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  categories: [],
};

// Create the products slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
  
      state.loading = false;
      state.items = action.payload;

      const uniqueCategories: string[] = [
        'ALL',
        ...new Set(action.payload.map(product => product.category)),
      ].sort((a, b) => a.localeCompare(b));

      state.categories = uniqueCategories; 
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
 
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {fetchProductsStart, fetchProductsSuccess, fetchProductsFailure} = productsSlice.actions;


export default productsSlice.reducer;
