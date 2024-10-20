// store/favoritesSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../types/product';

interface FavoritesState {
  favorites: Product[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Product>) {
      const existingIndex = state.favorites.findIndex(
        product => product.id === action.payload.id,
      );
      if (existingIndex >= 0) {
        // If the item is already a favorite, remove it
        state.favorites.splice(existingIndex, 1);
      } else {
        // Otherwise, add it to favorites
        state.favorites.push(action.payload);
      }
    },
  },
});

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
