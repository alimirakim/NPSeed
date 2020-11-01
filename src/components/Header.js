import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

// MATERIAL-UI
import {
  AppBar,
  Toolbar,
  Link,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'


// MY COMPONENTS


// ACTIONS
import { deleteUserToken } from '../actions/authActions'

// *****************************************************************************

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
}))

// *****************************************************************************

export default function Header() {
  const dispatch = useDispatch()
  const hasToken = useSelector(state => state.authUser.token ? true : false)
  const user = useSelector(state => state.authUser.user)
  const [anchor, setAnchor] = useState(null)
  // const [open, setOpen] = useState(false)
  console.log("do we hasToken?", hasToken)
  const classes = useStyles()

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
    <AppBar position="static">
      <Toolbar>

        {/* Logo */}
        <Typography variant="h6" className={classes.title}>
          <Link component={NavLink} to="/splash"color="inherit">NPSeed</Link>
        </Typography>
          {/* Welcome message */}
        <Typography variant="h6" className={classes.title} hidden={!hasToken}>
          💕 Hey hey hey, {user.username}! 💕
        </Typography>

        {/* Account Menu */}
        <nav hidden={!hasToken}>
          <IconButton onClick={handleClick}
            className={classes.menuButton} color="inherit"
            aria-label="menu" aria-controls="simple-menu" aria-haspopup="true">
            <AccountCircle />
          </IconButton>

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
          <Button component={NavLink}
            to={{ pathname: "/signup"}}
            variant="contained"
            color="secondary"
          >
            Sign up
          </Button>
          
          <Button
            component={NavLink}
            to="/login"
            color="inherit"
            variant="outlined"
          >
            Login
          </Button>
        </div>
        
      </Toolbar>
    </AppBar>
  )
}