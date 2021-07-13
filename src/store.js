import { configureStore } from '@reduxjs/toolkit'
import containerReducer from './reducer/containerReducer'
import containerTreeReducer from './reducer/containerTreeReducer'

export default configureStore({
  reducer: {
    container: containerReducer,
    containersTree: containerTreeReducer
  },
})