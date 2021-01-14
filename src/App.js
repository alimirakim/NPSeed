import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { basePath } from './config'

// MATERIAL-UI
import { CssBaseline } from '@material-ui/core'

// MY COMPONENTS
import Splash from './components/main/Splash'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './components/main/Profile'
import GeneratorForm from './components/main/GeneratorForm'

// ACTION CREATORS
import { setUserToken } from './store/actions/authActions'

// *****************************************************************************

// TODO I don't get it
// Function Route Component
// TODO Why not redirecting?
// NOTE I removed rest
function PrivateRoute({ component: Component }) {
  const hasToken = useSelector(state => state.authUser.token ? true : false)
  return (
    <Route render={props => {
      if (hasToken) return <Component {...props} />
      else return <Redirect to="/" />
    }} />
  )
}



function App() {
  const dispatch = useDispatch()
  // const hasToken = useSelector(state => state.authUser.token ? true : false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)

    const token = localStorage.getItem('TOKEN')
    if (token) {
      (async () => {
        const res = await fetch(`${basePath}/users/token`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const user = await res.json()
          dispatch(setUserToken(token, user))
        }
      })()
    }

  }, [dispatch])

  if (!loaded) return null

  return (
    <>
      {/* TODO Does this CssBaseline work as a self-closing?? */}
      <CssBaseline />
      <BrowserRouter>

        <Header />

        <main>
          <Switch>
            <Route path="/" exact={true} component={Splash} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/generator" component={GeneratorForm} />
            {/* TODO The private profile will always be user's, with editing abilities etc. */}
            <PrivateRoute path={"/profile"} exact={true} component={Profile} />
            <Route path={`/profile/:id`} component={Profile} />
          </Switch>
        </main>

        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
