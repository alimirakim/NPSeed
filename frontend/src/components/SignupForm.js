import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeUser } from '../actions/userActions'
import { UsernameForm, EmailForm, PasswordForm, ConfirmPasswordForm } from './FormInputs'

import { Button } from '@material-ui/core'

export default function SignUpForm() {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: "",
    email: null,
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
    <article id="signup-form">
      <h2>Sign up</h2>

      <form onSubmit={handleSubmit}>
        {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
        <UsernameForm username={userData.username} handleChange={handleChange} />
        <br/>
        <EmailForm email={userData.email} handleChange={handleChange} />
        <br/>
        <PasswordForm password={userData.password} handleChange={handleChange} />
        <br/>
        <ConfirmPasswordForm confirmPassword={userData.confirmPassword} handleChange={handleChange} />
        <br/>
        <Button type="submit" variant="contained">Sign-up</Button>
      </form>
      
      <small>Have an account? <a href="/login">Log-in here!</a></small>
    </article>
  )
}