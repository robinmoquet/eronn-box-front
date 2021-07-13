import { createSlice } from '@reduxjs/toolkit'

export const containerTreeReducer = createSlice({
    name: 'containersTree',
    initialState: {
      value: {},
    },
    reducers: {
      add: (state, action) => {
        state.value = {[action.payload.id]: action.payload, ...state.value};
      },
      update: (state, action) => {
        state.value = state.value.map(el => {
          if (el.id === action.payload.id) return action.payload
          else return el;
        })
      }
    },
  });

export const { add, update } = containerTreeReducer.actions

export default containerTreeReducer.reducer