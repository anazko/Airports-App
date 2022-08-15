import { createSlice } from "@reduxjs/toolkit"
import { ax } from "../axios/axios"

const initialState = {
  countries: [],
  types: []
}

export const handbook = createSlice({
  name: 'handbook',
  initialState,
  reducers: {
    fetchHandbookSucess: (state, action) => {
      console.log(action.payload)
      state.countries = action.payload.countries
      state.types = action.payload.types
    }
  }
})

export const fetchHandbook = () => {
  return async (dispatch) => {
    try {
      const response = await Promise.all([
        ax.get('/handbooks/countries'),
        ax.get('/handbooks/airport-types')
      ])
      dispatch(fetchHandbookSucess({
        countries: response[0].data,
        types: response[1].data
      }))
    } catch(e) {
      console.log('failed fetching handbook', e.message)
    }
  }
}

export default handbook.reducer
export const { fetchHandbookSucess } = handbook.actions