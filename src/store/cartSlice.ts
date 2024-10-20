import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the structure of a product
type Product = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
};

// Define the structure of the cart state
interface CartState {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  totalQuantity: number;
  totalProducts: number;
  userId: number;
}

// Initial state for the cart
const initialState: CartState = {
  id: 0,
  products: [],
  total: 0,
  discountedTotal: 0,
  totalQuantity: 0,
  totalProducts: 0,
  userId: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add a product to the cart
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.products.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        // Update the existing product quantity and total
        existingItem.quantity += action.payload.quantity;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        // Add the new product to the array
        state.products.push({
          ...action.payload,
          total: action.payload.price * action.payload.quantity,
        });
      }

      // Update totals after adding the product
      updateCartTotals(state);
    },

    // Action to remove a product from the cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        item => item.id !== action.payload,
      );
      // Update cart totals after removal
      updateCartTotals(state);
    },
    // Action to clear the cart
    clearCart: state => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalProducts = 0;
      state.total = 0;
      state.discountedTotal = 0;
    },
    // Action to set the cart items to a new object
    setToCart: (state, action: PayloadAction<CartState>) => {
      // Merge incoming products with existing products
      const incomingProducts = action.payload.products;

      incomingProducts.forEach(incomingProduct => {
        const existingItem = state.products.find(
          item => item.id === incomingProduct.id,
        );

        if (existingItem) {
          // Update the quantity and total of the existing item
          existingItem.quantity += incomingProduct.quantity;
          existingItem.total = existingItem.price * existingItem.quantity;
        } else {
          // Add new product if it doesn't exist
          state.products.push({
            ...incomingProduct,
            total: incomingProduct.price * incomingProduct.quantity,
          });
        }
      });

      // Update totals
      updateCartTotals(state);

      // Update other fields
      state.id = action.payload.id;
      state.userId = action.payload.userId;
    },
  },
});

// Helper function to update cart totals
const updateCartTotals = (state: CartState) => {
  state.totalQuantity = state.products.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  state.totalProducts = state.products.length;
  state.total = state.products.reduce(
    (sum, item) => sum + (item.total || 0),
    0,
  );
  state.discountedTotal = state.products.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
    0,
  );
};

// Export actions
export const {addToCart, removeFromCart, clearCart, setToCart} =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
