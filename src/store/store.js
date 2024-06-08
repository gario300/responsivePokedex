import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      currentPokemonState: counterReducer
    }
  })
}
