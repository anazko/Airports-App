import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHandbook } from '../../store/handbook.slice'
import { changeFilter } from '../../store/airports-slice'

import styles from './Filter.module.scss'

export const Filter = () => {

  const dispatch = useDispatch()
  const countries = useSelector(state => state.handbook.countries)
  const types = useSelector(state => state.handbook.types)
  const filter = useSelector(state => state.airports.filter)
  
  useEffect(() => {
    if (!countries.length && !types.length) {
      dispatch(fetchHandbook())
    }
  }, [dispatch, countries.length, types.length])

  const filterChangeHandler = (e) => {
    dispatch(changeFilter({ [e.target.name]: e.target.value } ))
  }

  const clearHandler = () => {
    dispatch(changeFilter({ country: '', type: '' } ))
  }

  return (
    <div className={styles.wrapper}> 
      <select 
        name="country" 
        id="filter-country" 
        onChange={ filterChangeHandler }
        value={filter.country}
      >
        <option key={'def'} value=''>Country not selected</option>
        {
          countries.length &&
          countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))         
        }
      </select>

      <select 
        name="type" 
        id="filter-type" 
        onChange={ filterChangeHandler }
        value={filter.type}
      >
        <option key={'def'} value=''>Type not selected</option>
        {
          types.length &&
          types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))         
        }
      </select>

      {(filter.type !== '' || filter.country !== '') && 
      <button className='red' onClick={clearHandler} >&times;</button>}
    </div>
  )
}   
