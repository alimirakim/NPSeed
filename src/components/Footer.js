import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

// MATERIAL-UI
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Build, ArrowUpward, MeetingRoom } from '@material-ui/icons'

// MY COMPONENTS

// ACTIONS
import { deleteUserToken } from '../actions/authActions'


// *****************************************************************************

export default function Footer() {
  const dispatch = useDispatch()
  const hasToken = useSelector(state => state.authUser.token ? true : false)
  console.log("hasToken footer", hasToken)
  const [value, setValue] = useState(0)

  const toTop = (ev) => <Redirect to="#top" />
  const toGenerator = (ev) => <Redirect to="/generator/start" />
  const handleLogout = (ev) => dispatch(deleteUserToken())

  return (
    <footer>
      <BottomNavigation
        value={value}
        showLabels
        onChange={(ev, newVal) => setValue(newVal)}
        color="primary"
      >

        <BottomNavigationAction label="Top" icon={<ArrowUpward />} onClick={toTop} />
        <BottomNavigationAction label="Make NPC" icon={<Build />} onClick={toGenerator} />
        <BottomNavigationAction hidden={!hasToken} label="Logout" onClick={handleLogout} icon={<MeetingRoom />} />
      </BottomNavigation>
    </footer>
  )
}