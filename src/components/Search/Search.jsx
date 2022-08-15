import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { ax } from '../../axios/axios'
import { useDebounce } from '../../hooks/useDebounce'
import styles from './Search.module.scss'




export const Search = () => {

  const [value, setValue] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const [results, setResults] = useState([])
  
  const debounced = useDebounce(value, 300)

  const fetchAirports = async (search) => {
    const res = await ax.get('/airports', {
      params: {
        count: 999999,
        search
      }
    })
    setResults(res.data.results)
  }

  

  useEffect(() => {
    document.addEventListener('click', blurHandler)
    return () => document.removeEventListener('click', blurHandler)
  }, [])

  useEffect(() => {
    if (debounced.length >= 3) {
      console.log('3')
      fetchAirports(debounced).then(setDropdown(true))
    } else {
      setDropdown(false)
    }
  }, [debounced])

  const changeHandler = (e) => {
    setValue(e.target.value)
  }

  const blurHandler = (e) => {
    if (e.target.id !== 'searchInput' && e.target.id !== 'searchDropdown') {
      setDropdown(false)
    }
  }

  const focusHandler = () => {
    if (results.length && debounced.length >= 3 ) setDropdown(true)
  }

  const keyDownHandler = (e) => {
    if (e.key === "Escape") {
      setDropdown(false)
      setResults([])
      setValue('')
    }
  }

  const renderDropdown = () => {
    if (results.length === 0) {
      return <p>no results</p>
    } else {
      return results.map(a => (
      <li key={a.id} className={ styles.searchItem }>
        <Link to={`/airports/${a.id}`} >
          {a.name}
        </Link>
      </li>))
    }
    
  }

  return (
    <div className={ styles.wrapper } >
      <input
        id='searchInput'
        type="text" 
        className={ styles.searchInput } 
        value={ value }
        onChange={ changeHandler }
        placeholder="Search..."
        // onBlur={ blurHandler }
        onFocus={ focusHandler }
        onKeyDown={ keyDownHandler }
      />
       
      {dropdown && 
      <div className={ styles.dropdown } id='searchDropdown'>
        <ul>
          { renderDropdown() }
        </ul> 
      </div>}

      
    </div>
  )
}
