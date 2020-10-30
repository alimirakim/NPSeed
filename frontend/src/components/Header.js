import React, { useState } from 'react'
import {NavLink, Link as RouterLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/authActions'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Link, Button, IconButton, Typography, Menu, MenuItem, ButtonGroup } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
}))


export default function Header() {
  const dispatch = useDispatch()
  // const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const hasToken = useSelector(state => state.authentication.token ? true : false)
  console.log("do we hasToken?\n\n", hasToken)
  const user = useSelector(state => state.user)

  const classes = useStyles()

  const handleClick = ev => setAnchor(ev.currentTarget)

  const handleClose = () => {
    setAnchor(null)
  }

  const handleLogout = (ev) => {
    setAnchor(null)
    dispatch(logout())
  }

  // const toggle = () => {
  //   setOpen(!open)
  // }

  return (
    <AppBar position="static">
      <Toolbar>

        <Link component={NavLink} to="/splash" color="secondary">NPSeed</Link>
        <Typography variant="h6" className={classes.title} hidden={!hasToken}>
          Hey hey hey, {user.username}!
    </Typography>

        <div edge="end" hidden={hasToken}>
          <Button component={NavLink} to={{pathname: "/signup", state: {hasToken}}} variant="contained" hidden={hasToken}>Sign up</Button>
          <Button component={NavLink} to="/login" color="inherit" hidden={hasToken}>Login</Button>
        </div>
        {/* Account Menu */}
        <nav hidden={!hasToken}>
          <IconButton onClick={handleClick}
            edge="start" className={classes.menuButton} color="inherit"
            aria-label="menu" aria-controls="simple-menu" aria-haspopup="true">
            <AccountCircle edge="end" />
          </IconButton>

          <Menu anchorEl={anchor}
            keepMounted
            open={Boolean(anchor)}
            onClose={handleClose}
          >

            <MenuItem onClick={handleClose} component={NavLink} to={{pathname: "/profile", props: {hasToken}}}>Profile</MenuItem>
            <MenuItem onClick={handleClose} component={NavLink} to={{pathname: "/characters", props: {hasToken}}}>Characters</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </nav>
      </Toolbar>
    </AppBar>
  )
}