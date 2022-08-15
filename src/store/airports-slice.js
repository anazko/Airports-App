import { createSlice } from "@reduxjs/toolkit"
import { ax } from "../axios/axios"

const initialState = {
  airports: [],
  count: 0,
  isLoading: false,
  itemsPerPage: localStorage.getItem('OPTIONS-ITEMSPERPAGE') || 10,
  filter: {
    country: '',
    type: ''
  }
}

export const airports = createSlice({
  name: 'airports',
  initialState,
  reducers: {
    fetchingAirpots: (state, action) => {
      state.isLoading = action.payload
    },
    fetchAirportSucess: (state, action) => {
      state.airports = action.payload.airports
      state.count = action.payload.count
      state.isLoading = false
    },
    changeFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload }
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
      localStorage.setItem('OPTIONS-ITEMSPERPAGE', action.payload)
    }
  }
})

export const fetchAirports = (count = 50, page = 1, {country, type}) => {
  return async (dispatch) => {
    const searchParams = {}
    if (country) searchParams.country = country
    if (type) searchParams.type = type
    dispatch(fetchingAirpots(true))
    try {
      const response = await ax.get('/airports', {
        params: {
          ...searchParams,
          count,
          page
        }
      })
      dispatch(fetchAirportSucess({
        airports: response.data.results, 
        count: response.data.count
      }))
      dispatch(fetchingAirpots(false))
    } 
    catch(e) {
      console.log('failed fetching airports:', e.message)
      dispatch(fetchingAirpots(false))
    }
  }
}

export const { 
  fetchingAirpots, 
  fetchAirportSucess, 
  changeFilter, 
  setItemsPerPage } = airports.actions
export default airports.reducer
