import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ax } from '../axios/axios'
import { YMaps, Map, Placemark } from "react-yandex-maps"

import styles from './AirportDetails.module.scss'

export const AirportDetails = () => {

  const [airport, setAirport] = useState({})
  const {id} = useParams()

  let lng, lat

  useEffect(() => {
    ax.get(`/airports/${id}`).then(res => setAirport(res.data))
  }, [id])

  if (airport.coordinates) {
   [lng, lat] = airport.coordinates.split(', ')

  }


  return (
    <div>
      <h1 className={styles.header}>
        {airport.name}
      </h1>
      <div className={styles.info}>
        <p>country: {airport?.country}</p>
        <p>continent: {airport?.continent}</p>
        <p>coordinates: {airport?.coordinates}</p>
        <p>elevation_ft: {airport?.elevation_ft}</p>
        <p>gps_code: {airport?.gps_code}</p>
        <p>iata_code: {airport?.iata_code}</p>
        <p>ident: {airport?.ident}</p>
        <p>local_code: {airport?.local_code}</p>
        <p>municipality: {airport?.municipality}</p>
        <p>region: {airport?.region}</p>
        <p>type: {airport?.type}</p>
      </div>

      <YMaps>
        <Map 
          defaultState={{ center: [lat, lng], zoom: 4 }} 
          width='100%'
          height='400px'
        >
          <Placemark geometry={[lat, lng]}/>
        </Map>
      </YMaps>

    </div>
  )
}
