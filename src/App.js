import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

// Material-UI
import { CssBaseline } from '@material-ui/core'

import { loadToken } from './actions/authActions'
import Splash from './components/Splash'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Footer from './components/Footer'
import GeneratorForm from './components/GeneratorForm'
import Profile from './components/Profile'
import Character from './components/Character'

// TODO I don't get it
// Function Route Component
// TODO Why not redirecting?
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => {
      console.log("what is rest.hasToken", rest.hasToken)//, props)
      if (rest.hasToken) return <Component {...props} />
      else return <Redirect to="/signup" />
    }} />
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  // const [hasToken, setHasToken] = useState(false)
  // const token = useSelector(state => state.authentication.token)
  const hasToken = useSelector(state => state.authentication.token ? true : false)
  const user = useSelector(state => state.user)

  useEffect(() => {
    setLoaded(true)
    dispatch(loadToken())
  }, [dispatch])

  // TODO What exactly is this, why must loadToken() before render
  if (!loaded) return null

  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/splash" component={Splash} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />

          <Route path="/generator" component={GeneratorForm} />

          {/* <PrivateRoute path="/" exact={true} component={Footer} hasToken={hasToken} /> */}
          <PrivateRoute path={"/profile"} component={Profile} hasToken={hasToken} />
          <PrivateRoute path={`/profile/:id`} component={Profile} hasToken={hasToken} />
          {/* <PrivateRoute path={"/characters"} component={Character} hasToken={hasToken} /> */}
          <PrivateRoute path={`/users/:userId/characters`} component={Profile} hasToken={hasToken} />
          <PrivateRoute path={`/users/:userId/characters/:charId`} component={Character} hasToken={hasToken} />
        </Switch>
      </BrowserRouter>

      <Footer />
    </>

  )
}

export default App
