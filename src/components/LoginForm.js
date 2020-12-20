import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

// MY COMPONENTS
import { UsernameForm, PasswordForm } from './FormInputs'
import ErrorsDisplay from './ErrorsDisplay'

// ACTIONS
import { login } from '../store/actions/authActions'

// *****************************************************************************

// *****************************************************************************

export default function LoginForm() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.authUser)
  const [loginData, setLoginData] = useState({
    username: "demo",
    password: "password",
  })

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
      <article>
        <h2>Log-in</h2>
        
        <ErrorsDisplay />

        <form onSubmit={handleSubmit}>
          <UsernameForm username={loginData.username} handleChange={handleChange} />
          <PasswordForm password={loginData.password} handleChange={handleChange} />
          <button>Log-in</button>
        </form>
        <small>Need an account? <Link to="/signup">Sign-up here!</Link></small>
      </article>
  )
}

// Login redirect -
// confirm password
// Signup/login show when logged out
// account menu show when logged in
// show error messages when submit form wrong results