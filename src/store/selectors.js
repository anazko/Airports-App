import { createSelector } from "@reduxjs/toolkit"

export const selectAirports = state => state.airports.airports 
export const selectCount = state => state.airports.count
export const selectItemsPerPage = state => state.airports.itemsPerPage

export const selectPagesCount = createSelector(
  [selectCount, selectItemsPerPage],
  (count, perPage) => Math.ceil(count / perPage)
)