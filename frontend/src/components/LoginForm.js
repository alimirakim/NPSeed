import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/authActions'
import { UsernameForm, PasswordForm } from './FormInputs'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': { margin: theme.spacing(1) }
  }
}))

export default function LoginForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: "demo",
    password: "password",
  })

  const token = useSelector(state => state.authentication.token)
  if (token) return <Redirect to="/" />

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(login(userData.username, userData.password))
    
  }

  const handleChange = (property) => (ev) => {
    setUserData({ ...userData, [property]: ev.target.value })
  }

  return (
    <Container maxWidth="xs">
    <article id="login" className={classes.root}>
      <h2>Log-in</h2>

      <form onSubmit={handleSubmit}>
        <UsernameForm username={userData.username} handleChange={handleChange} />
        <br />
        <PasswordForm password={userData.password} handleChange={handleChange} />
        <br />
        <Button variant="contained" type="submit">Log-in</Button>
      </form>

      <small>Need an account? <a href="/signup">Sign-up here!</a></small>
    </article>
    </Container>
  )
}

// Login redirect -
// confirm password
// Signup/login show when logged out
// account menu show when logged in
// show error messages when submit form wrong results