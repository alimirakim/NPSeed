import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadToken } from '../actions/authActions'
import { UsernameForm, PasswordForm } from './FormInputs'

export default function LoginForm() {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    username: "demo",
    password: "password",
  })

  const token = useSelector(state => state.authentication.token)
  if (token) return <Redirect to="/" />

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(loadToken(userData))
  }

  const handleChange = (property) => (ev) => {
    setUserData({ ...userData, [property]: ev.target.value })
  }
  
  return (
    <article id="login">
      <h2>Log-in</h2>
      
      <form onSubmit={handleSubmit}>
        <UsernameForm username={userData.username} handleChange={handleChange} />
        <PasswordForm password={userData.password} handleChange={handleChange} />
        <button>Log-in</button>
      </form>
      
      <small>Need an account? <a href="/signup">Sign-up here!</a></small>
    </article>
  )
}
