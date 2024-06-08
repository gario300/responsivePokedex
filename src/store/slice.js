import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'currentPokemonState',
  initialState: {
    value: null
  },
  reducers: {
    changeValue: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeValue } = counterSlice.actions

export default counterSlice.reducer
