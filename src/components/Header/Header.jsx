  import React from 'react'
  import { Logo } from 'components/Logo/Logo'
  import { useDispatch, useSelector } from 'react-redux'


  import { logout } from "../../store/auth.slice"

  import styles from "./Header.module.scss"

  export const Header = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)

    const logoutHandler = () => {
      dispatch(logout())
    }

    return (
      <div className={ styles.wrapper }>
        <div className={ `${styles.content} container` }>
          <Logo />
          { isAuth && <button onClick={ logoutHandler }>Logout</button> }
        </div>
      </div>
    )
  }
