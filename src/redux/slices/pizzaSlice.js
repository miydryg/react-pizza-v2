import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


 export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const { sortBy, oreder, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://62c81ac48c90491c2caeb75d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${oreder}${search}`,
    );

    return data;
 
  },
 
);

const initialState = {
  items: [],
  status: 'loading'
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state, action) =>{
      state.status = 'loading'
      state.items = [];
    },
    [fetchPizza.fulfilled]: (state, action) =>{
      state.items = action.payload;
      state.status = 'success'
    }, 
    [fetchPizza.rejected]: (state, action) =>{
      state.status = 'error';
      state.items = [];
    }
  }
});

export const selectGetPizza = (state)=> state.pizza;

export const { setItems, } = pizzaSlice.actions;

export default pizzaSlice.reducer;
