import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from "./../store/auth.slice"

import styles from "./Login.module.scss"

export const Login = () => {

  const dispatch = useDispatch()

  const [form, setForm] = useState({ 
    username: '',
    password: ''
  })

  const changeHandler = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(form))
  }

  return (
    <div className={ styles.wrapper }>
      <form className={ styles.loginForm } onSubmit={ submitHandler }>

        <h1 className={ styles.header }>Login</h1>

        <label>
          Username
          <input type="text" name="username" value={form.username} onChange={changeHandler} autoFocus />
        </label>

        <label>
          Password
          <input type="text" name="password" value={form.password} onChange={changeHandler} />
        </label>

        <button type="submit" className={ styles.btn} >Login</button>

        Don't have a account? <Link to="/register">Register</Link>

      </form>
    </div>
  )
}
