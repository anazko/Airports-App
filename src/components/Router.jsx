import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Airports } from '../pages/Airports'
import { AirportDetails } from '../pages/AirportDetails'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

export const Router = () => {
  
    const isAuth = useSelector(state => state.auth.isAuth)

    if (!isAuth) return (
        <Routes>
            <Route path="/login" element={ <Login /> }></Route>
            <Route path="/register" element={ <Register /> }></Route>
            <Route path="*" element={ <Navigate to="/login" /> }></Route>
        </Routes>
        
    )

    return (
        <Routes>
            <Route path='/airports' element={ <Airports /> }></Route>
            <Route path='/airports/:id' element={ <AirportDetails /> }></Route>
            <Route path='*' element={ <Navigate to="/airports" replace/> } ></Route>
        </Routes>
    )


}
