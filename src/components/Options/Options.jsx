import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectItemsPerPage } from '../../store/selectors'
import { setItemsPerPage } from '../../store/airports-slice'

import styles from './Options.module.scss'

export const Options = () => {

  const dispatch = useDispatch()
  const itemsPerPage = useSelector(selectItemsPerPage)

  const changeHandler = (e) => {
      dispatch(setItemsPerPage(e.target.value))
  }

  return (
    <div className={styles.wrapper}>
      <label>
        <p>Items per page:</p>
        <select name="itemsPerPage" value={itemsPerPage} onChange={changeHandler}>
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
          <option>100</option>
        </select>
      </label>

    </div>
  )
}
