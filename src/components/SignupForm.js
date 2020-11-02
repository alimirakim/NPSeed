import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

// MATERIAL-UI
import {makeStyles} from '@material-ui/core/styles'
import { Button, Paper } from '@material-ui/core'

// MY COMPONENTS
import { 
  UsernameForm, 
  EmailForm, 
  PasswordForm, 
  ConfirmPasswordForm, 
  ErrorsDisplay 
} from './FormInputs'

// ACTIONS
import { makeUser } from '../actions/authActions'

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


export default function SignUpForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const token = useSelector(state => state.authUser.token)
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "password",
    confirmPassword: "password",
  })

  if (token) return <Redirect to="/" />

  const handleSubmit = (ev) => {
    ev.preventDefault()
    console.log("signupData", signupData)
    dispatch(makeUser(signupData))
    
  }

  const handleChange = (property) => (ev) => {
    setSignupData({ ...signupData, [property]: ev.target.value })
  }

  return (
    <article className={classes.root}>
      <Paper elevation={3}>
      <h2>Sign up</h2>
      
      <ErrorsDisplay />

      <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
        {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
        <UsernameForm username={signupData.username} handleChange={handleChange} />
        <br/>
        <br/>
        <EmailForm email={signupData.email} handleChange={handleChange} />
        <br/>
        <br/>
        <PasswordForm password={signupData.password} handleChange={handleChange} />
        <br/>
        <br/>
        <ConfirmPasswordForm confirmPassword={signupData.confirmPassword} handleChange={handleChange} />
        <br/>
        <br/>
        <Button type="submit" variant="contained" color="secondary" style={{display:"inline-block", padding: "0.5rem 2rem"}}>Sign-up</Button>
      <br/>
      <br/>
      <small>Have an account? <Link to="/login">Log-in here!</Link></small>
      </form>
      </Paper>
    </article>
  )
}