import React from 'react'

export function UsernameForm({ username, handleChange }) {
  return (
    <label>Username
      <input
        type="text"
        onChange={handleChange("username")}
        value={username}
        placeholder="Username"
        required
      />
    </label>
  )
}

export function EmailForm({ email, handleChange }) {
  return (
    <label>e-mail
      <input
        type="email"
        onChange={handleChange("email")}
        value={email}
        placeholder="e-mail (optional)"
      />
    </label>
  )
}

export function PasswordForm({ password, handleChange }) {
  return (
    <label>Password
      <input
        type="password"
        onChange={handleChange("password")}
        placeholder="Password"
        value={password}
        required
      />
    </label>
  )
}

export function ConfirmPasswordForm({ confirmPassword, handleChange }) {
  return (
    <label>
      <input
        type="password"
        required
        onChange={handleChange("confirmPassword")}
        value={confirmPassword}
        placeholder="Confirm Password"
      />
    </label>
  )
}
