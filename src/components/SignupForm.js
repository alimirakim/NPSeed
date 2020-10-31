import React, { useState } from 'react'
import {Redirect, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeUser } from '../actions/userActions'
import { UsernameForm, EmailForm, PasswordForm, ConfirmPasswordForm, ErrorsDisplay } from './FormInputs'

import {makeStyles} from '@material-ui/core/styles'
import { Button, Paper } from '@material-ui/core'

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



export default function SignUpForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "password",
    confirmPassword: "password",
  })

  const token = useSelector(state => state.authentication.token)
  if (token) return <Redirect to="/" />

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(makeUser(userData))
    
  }

  const handleChange = (property) => (ev) => {
    setUserData({ ...userData, [property]: ev.target.value })
  }

  return (
    <article id="signup-form" className={classes.root}>
      <Paper elevation={3}>
      <h2>Sign up</h2>
      
      <ErrorsDisplay />

      <form onSubmit={handleSubmit}>
        {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
        <UsernameForm username={userData.username} handleChange={handleChange} />
        <br/>
        <br/>
        <EmailForm email={userData.email} handleChange={handleChange} />
        <br/>
        <br/>
        <PasswordForm password={userData.password} handleChange={handleChange} />
        <br/>
        <br/>
        <ConfirmPasswordForm confirmPassword={userData.confirmPassword} handleChange={handleChange} />
        <br/>
        <br/>
        <Button type="submit" variant="contained">Sign-up</Button>
      </form>
      <br/>
      <small>Have an account? <Link to="/login">Log-in here!</Link></small>
      </Paper>
    </article>
  )
}