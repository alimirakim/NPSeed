import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/authActions'

// Material UI
import { makeStyles} from '@material-ui/core/styles'
import { AppBar, Toolbar, Link, Button, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
}))


export default function Header() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const token = useSelector(state => state.authentication.token)
  
  
  const classes = useStyles()

  const handleClick = ev => {
    setAnchor(ev.currentTarget)
  }

  const handleClose = () => {
    setAnchor(null)
  }
  
  const handleLogout = (ev) => {
    console.log("log out??\n\n")
    setAnchor(null)
    dispatch(logout())
  }

  const toggle = () => {
    setOpen(!open)
  }

  return (
    <AppBar position="static">
      <Toolbar>



        <Typography variant="h6" className={classes.title}>
          <Link href="/splash" color="secondary">NPSeed</Link>
    </Typography>
        <Button href="/signup" variant="contained">Sign up</Button>
        <Button href="/login" color="inherit">Login</Button>


{/* Account Menu */}
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
          <MenuItem onClick={handleClose} href="/profile"><Link href="/profile">Profile</Link></MenuItem>
          <MenuItem onClick={handleClose} href="/characters"><Link href="/characters">Characters</Link></MenuItem>
          <MenuItem onClick={handleLogout} href="/logout">Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">NPSeed</a></li>
          <li><a href="/signup">Sign up</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/generator/start">Generate NPC</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
    </header>
  )
}