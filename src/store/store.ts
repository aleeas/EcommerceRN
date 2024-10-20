import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
