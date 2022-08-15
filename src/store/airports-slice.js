import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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

export const fetchAirports = createAsyncThunk(
  'airports/fetchAirports',
  async ({itemsPerPage, page, country, type}, {rejectWithValue}) => {

    const searchParams = {}
    if (country) searchParams.country = country
    if (type) searchParams.type = type

    try {
      const response = await ax.get('/airports', {
        params: {
          ...searchParams,
          count: itemsPerPage,
          page
        }
      })
      return { airports: response.data.results, count: response.data.count }
    }
    catch(e) {
      return rejectWithValue("Error on fetching airports: " + e.message)
    }
  }
)

export const airports = createSlice({
  name: 'airports',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload }
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload
      localStorage.setItem('OPTIONS-ITEMSPERPAGE', action.payload)
    }
  },
  extraReducers: {  
    [fetchAirports.pending]: (state) => {
      state.isLoading = true
    },
    [fetchAirports.fulfilled]: (state, action) => {
      state.airports = action.payload.airports
      state.count = action.payload.count
      state.isLoading = false
    },
    [fetchAirports.rejected]: (state, action) => {
      console.log(action.payload)
      state.isLoading = false
    },
  }
})

export const { 
  changeFilter, 
  setItemsPerPage 
} = airports.actions
export default airports.reducer
