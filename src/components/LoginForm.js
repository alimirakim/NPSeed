import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

// MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button } from '@material-ui/core'

// MY COMPONENTS
import { UsernameForm, PasswordForm, ErrorsDisplay } from './FormInputs'

// ACTIONS
import { login } from '../actions/authActions'

// *****************************************************************************

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      padding: theme.spacing(4, 10),
      margin: theme.spacing(4, 'auto'),
    },
  },
}))

// *****************************************************************************

export default function LoginForm() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.authUser)
  const [loginData, setLoginData] = useState({
    username: "demo",
    password: "password",
  })
  const classes = useStyles()

  // console.log("errors deconstructed\n\n", errors, errors.errors)
  
  if (token) return <Redirect to="/" />

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(login(loginData.username, loginData.password))
  }

  const handleChange = (property) => (ev) => {
    setLoginData({ ...loginData, [property]: ev.target.value })
  }

  return (
      <article id="login" className={classes.root}>
      <Paper elevation={3}>
        <h2>Log-in</h2>
        
        <ErrorsDisplay />

        <form onSubmit={handleSubmit}>
          <UsernameForm username={loginData.username} handleChange={handleChange} />
          <br />
          <br />
          <PasswordForm password={loginData.password} handleChange={handleChange} />
          <br />
          <br />
          <Button variant="contained" type="submit">Log-in</Button>
        </form>
        <br />
        <small>Need an account? <Link to="/signup">Sign-up here!</Link></small>
        </Paper>
      </article>
  )
}

// Login redirect -
// confirm password
// Signup/login show when logged out
// account menu show when logged in
// show error messages when submit form wrong results