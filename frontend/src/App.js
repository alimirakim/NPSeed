import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

// Material-UI
import { CssBaseline, Container, AppBar, Toolbar, Typography, Link, Button, IconButton } from '@material-ui/core'

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
    <Route {...rest} render={props => { rest.hasToken === false 
      ? <Redirect to="/signup" /> : <Component {...props} />
    }} />
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)
  // const [isGoodToken, setIsGoodToken] = useState(false)
  const dispatch = useDispatch()
  const hasToken = useSelector(state => state.authentication.token)

  useEffect(() => {
    setLoaded(true)
    dispatch(loadToken())
  }, [dispatch])

  // TODO What exactly is this, why must loadToken() before render
  if (!loaded) return null

  return (
    <>
      <CssBaseline />
        <Header />

        <BrowserRouter>
          <Switch>
            <Route path="/splash" component={Splash} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/login" component={LoginForm} />
            
            <Route path="/generator" component={GeneratorForm} />
            
            {/* <PrivateRoute path="/" exact={true} component={Footer} hasToken={hasToken} /> */}
            <PrivateRoute path="/profile/:userId" component={Profile} />
            <PrivateRoute path="/characters/:charId" component={Character} />
          </Switch>
        </BrowserRouter>
        
        <Footer />
    </>

  )
}

export default App
