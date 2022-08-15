import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AirportsList.module.scss'

export const AirportsList = ({airports}) => {
    return (
    <div className={styles.airportsList}>
        {
        airports.length 
        ? airports.map(a => 
            <Link 
                to={`/airports/${a.id}`} 
                key={a.id} 
                className={styles.airportItem}
            >
                <h4>{a.name}</h4>
                <p><b>{a.type} : {a.country}</b></p>
            </Link>)
        : <p>No results</p>
        }
    </div>
    )
}