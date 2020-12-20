import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

// MATERIAL-UI
import {
  Menu,
  MenuItem,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'


// MY COMPONENTS


// ACTIONS
import { deleteUserToken } from '../store/actions/authActions'

// *****************************************************************************

// *****************************************************************************

export default function Header() {
  const dispatch = useDispatch()
  const hasToken = useSelector(state => state.authUser.token ? true : false)
  const user = useSelector(state => state.authUser.user)
  const [anchor, setAnchor] = useState(null)

  const handleClick = ev => setAnchor(ev.currentTarget)

  const handleClose = (ev) => setAnchor(null)

  const handleLogout = (ev) => {
    setAnchor(null)
    dispatch(deleteUserToken())
  }

  // const toggle = () => {
  //   setOpen(!open)
  // }

  return (
    <header id="top">
        
        {/* Logo */}
          <Link to="/">NPSeed</Link>
        {/* Welcome message */}
        <aside hidden={!hasToken}>
          Welcome back, {user.username}!
        </aside>

        {/* Account Menu */}
        <nav hidden={!hasToken}>
          <button onClick={handleClick}><AccountCircle /></button>

          <Menu anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}
              component={NavLink}
              to={{ pathname: "/profile" }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </nav>

        <div hidden={hasToken}>
          <Link to={"/signup"}>Sign up</Link>
          <Link to="/login">Login</Link>
        </div>

    </header>
  )
}