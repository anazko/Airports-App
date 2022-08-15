import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';

import { Filter } from '../components/Filter/Filter'
import { Search } from '../components/Search/Search'

import { fetchAirports } from '../store/airports-slice'
import { 
  selectPagesCount, 
  selectAirports, 
  selectItemsPerPage
} from '../store/selectors'

import styles from './Airports.module.scss'
import { Options } from '../components/Options/Options';
import { AirportsList } from 'components/AirportsList/AirportsList';



export const Airports = () => {

  const dispatch = useDispatch()

  const airports = useSelector(selectAirports)
  const isLoading = useSelector(state => state.airports.isLoading)
  const country = useSelector(state => state.airports.filter.country)
  const type = useSelector(state => state.airports.filter.type)
  const pagesCount = useSelector(selectPagesCount)
  const itemsPerPage = useSelector(selectItemsPerPage)
  const [page, setPage] = useState(1)
  
  useEffect(() => {
    dispatch(fetchAirports({ itemsPerPage, page, country, type }))
  }, [country, type, itemsPerPage, page, dispatch])

  useEffect(() => {
    setPage(1)
  }, [country, type])
  
  const handlePageClick = (e) => {
    setPage(e.selected + 1)
  }

  return (
    <>

      <Search />
      <Filter />
      <Options />

      { 
      pagesCount &&
      <ReactPaginate
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
        breakLabel="..."
        marginPagesDisplayed={1}
        nextLabel=" > "
        nextClassName={styles.next}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pagesCount}
        previousLabel=" < "
        previousClassName={styles.previous}
        renderOnZeroPageCount={null} 
        forcePage={page - 1}
      />
      }

      { 
      isLoading
      ? <p>Loading...</p> 
      : <AirportsList airports={airports} /> 
      }

      { 
      pagesCount &&
      <ReactPaginate
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
        breakLabel="..."
        marginPagesDisplayed={1}
        nextLabel=" > "
        nextClassName={styles.next}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pagesCount}
        previousLabel=" < "
        previousClassName={styles.previous}
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
      }

    </>
  )
}
