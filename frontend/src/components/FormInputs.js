import React from 'react'
import { TextField } from '@material-ui/core'


export function UsernameForm({ username, handleChange }) {
  return (
    <TextField
      label="Username"
      type="text"
      onChange={handleChange("username")}
      value={username}
      placeholder="Username"
      required
      variant="outlined"
      InputLabelProps={{shrink: true}}
    />
  )
}

export function EmailForm({ email, handleChange }) {
  return (
    <TextField
      label="e-mail"
      type="email"
      onChange={handleChange("email")}
      value={email}
      placeholder="e-mail"
      variant="outlined"
    />
  )
}

export function PasswordForm({ password, handleChange }) {
  return (
    <TextField
      label="Password"
      type="password"
      onChange={handleChange("password")}
      placeholder="Password"
      value={password}
      required
      variant="outlined"
    />
  )
}

export function ConfirmPasswordForm({ confirmPassword, handleChange }) {
  return (
    <TextField
      label="Confirm Password"
      type="password"
      onChange={handleChange("confirmPassword")}
      placeholder="Confirm Password"
      value={confirmPassword}
      required
      variant="outlined"

    />
  )
}
