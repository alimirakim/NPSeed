import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import { loadToken } from './actions/authActions'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'

// TODO I don't get it
// Function Route Component
// TODO Why not redirecting?
function PrivateRoute({ component: Component, ...rest }) {
  <Route {...rest} render={props => {
    rest.hasToken === false
      ? <Redirect to="/login" />
      : <Component {...props} />
  }} />
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const hasToken = useSelector(state => state.authentication.token)
  console.log('loaded', loaded)
  console.log('hasToken', hasToken)
  
  useEffect(() => {
    setLoaded(true)
    dispatch(loadToken())
  }, [dispatch])
  
  // TODO What exactly is this, why must loadToken() before render
  if (!loaded) return null
  
  
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route path="/signup" component={SignupForm} />
        <Route path="/login" component={LoginForm} />
        <PrivateRoute path="/" exact={true} component={Header} hasToken={hasToken} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
