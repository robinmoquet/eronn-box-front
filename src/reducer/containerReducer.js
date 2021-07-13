import { createSlice } from '@reduxjs/toolkit'

export const containerReducer = createSlice({
    name: 'container',
    initialState: {
      value: null,
    },
    reducers: {
      updateList: (state, action) => {
        state.value = action.payload
      },
      update: (state, action) => {
        state.value = state.value.map(el => {
          if (el.id === action.payload.id) return action.payload
          else return el;
        })
      }
    },
  });

export const { updateList, update } = containerReducer.actions

export default containerReducer.reducer