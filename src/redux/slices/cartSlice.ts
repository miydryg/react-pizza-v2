import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { getCartFromLS } from './../../utils/getCartFromLS';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number;
  types: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
  
  totalPrice,
  items,
 
};

type ItemActionType={
	id:string,
	types:string,
	sizes:number
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.sizes === action.payload.sizes &&
          obj.types === action.payload.types,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
       
      }
      state.totalPrice = calcTotalPrice(state.items)
    },

    plusItem(state, action:PayloadAction<ItemActionType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.sizes === action.payload.sizes &&
          obj.types === action.payload.types,
      );
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.items)
    },

    minusItem(state, action:PayloadAction<ItemActionType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.sizes === action.payload.sizes &&
          obj.types === action.payload.types,
      );
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items)
    },

   removeItem(state, action:PayloadAction<ItemActionType>) {
      state.items = state.items.filter(
        (el) =>
          el.id !== action.payload.id ||
          el.types !== action.payload.types ||
          el.sizes !== action.payload.sizes,
      );
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem, plusItem } = cartSlice.actions;

export default cartSlice.reducer;
