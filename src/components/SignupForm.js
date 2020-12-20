import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

// MY COMPONENTS
import { UsernameForm, EmailForm, PasswordForm, ConfirmPasswordForm, }
  from './FormInputs'
import ErrorsDisplay from './ErrorsDisplay'

// ACTIONS
import { makeUser } from '../store/actions/authActions'

// *****************************************************************************

export default function SignUpForm() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authUser.token)
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "password",
    confirmPassword: "password",
  })
    
  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(makeUser(signupData))
  }
  
  const handleChange = (property) => (ev) => {
    setSignupData({ ...signupData, [property]: ev.target.value })
  }
  
  if (token) return <Redirect to="/" />

  return (
    <article>
      <h2>Sign up</h2>

      <ErrorsDisplay />

      <form onSubmit={handleSubmit}>
        {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
        <UsernameForm username={signupData.username} handleChange={handleChange} />
        <EmailForm email={signupData.email} handleChange={handleChange} />
        <PasswordForm password={signupData.password} handleChange={handleChange} />
        <ConfirmPasswordForm confirmPassword={signupData.confirmPassword} handleChange={handleChange} />
        <button>Sign-up</button>

        <small>Have an account? <Link to="/login">Log-in here!</Link></small>
      </form>
    </article>
  )
}