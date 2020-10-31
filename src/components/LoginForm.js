import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/authActions'
import { UsernameForm, PasswordForm, ErrorsDisplay } from './FormInputs'

import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button } from '@material-ui/core'

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


export default function LoginForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: "demo",
    password: "password",
  })

  const { token, errors } = useSelector(state => state.authentication)
  console.log("errors deconstructed\n\n", errors, errors.errors)
  
  if (token) return <Redirect to="/" />

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(login(userData.username, userData.password))
  }

  const handleChange = (property) => (ev) => {
    setUserData({ ...userData, [property]: ev.target.value })
  }

  return (
      <article id="login" className={classes.root}>
      <Paper elevation={3}>
        <h2>Log-in</h2>
        
        <ErrorsDisplay />

        <form onSubmit={handleSubmit}>
          <UsernameForm username={userData.username} handleChange={handleChange} />
          <br />
          <br />
          <PasswordForm password={userData.password} handleChange={handleChange} />
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