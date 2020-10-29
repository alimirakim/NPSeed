import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeUser } from '../actions/userActions'
import { UsernameForm, EmailForm, PasswordForm, ConfirmPasswordForm } from './FormInputs'

export default function SignUpForm() {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const token = useSelector(state => state.authentication.token)
  if (token) return <Redirect to="/" />

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(makeUser(userData))
    console.log('submitted?')
  }

  const handleChange = (property) => (ev) => {
    setUserData({ ...userData, [property]: ev.target.value })
    console.log(userData)
  }

  return (
    <article id="signup-form">
      <h2>Sign up</h2>

      <form onSubmit={handleSubmit}>
        {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
        <UsernameForm username={userData.username} handleChange={handleChange} />
        <EmailForm email={userData.email} handleChange={handleChange} />
        <PasswordForm password={userData.password} handleChange={handleChange} />
        <ConfirmPasswordForm confirmPassword={userData.confirmPassword} handleChange={handleChange} />
        <button>Sign-up</button>
      </form>
      
      <small>Have an account? <a href="/login">Log-in here!</a></small>
    </article>
  )
}