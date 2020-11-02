import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// MATERIAL-UI
import {
  Typography,
  Button,
  IconButton
} from '@material-ui/core'
import { List, Edit, Delete } from '@material-ui/icons'

// MY COMPONENTS

// ACTIONS
import { getUserChars } from '../actions/charActions'


export default function Profile(props) {
  {/* let user; */ }
  // TODO This will actually need dispatch to work
  {/* if (props.match.params.id) user = useSelector(state => state.users.props.match.params.id) */ }
  {/* else user = useSelector(state => state.authUser.user) */ }
  const user = useSelector(state => state.authUser.user)
  console.log("type", typeof user.createdAt)
  user.createdAt = user.createdAt.toLocaleString()
  return (
    <article>
    <br/>
    <br/>
      <Typography variant="h1">{user.username}</Typography>
      <small>Joined on {user.createdAt}.</small>

      <h2>{user.username}'s Characters</h2>

      <UserCharacters />

    </article>
  )
}

function UserCharacters() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authUser.user)
  const chars = useSelector(state => state.characters.filter(char => char.UserId == user.id))
  const hasChars = user.Characters.length > 0

  useEffect(() => {
    if (hasChars && chars.length === 0) dispatch(getUserChars(user.id))
  }, [])

  if (!chars) return null

  return (
    <ul style={{ display: "flex", flexWrap: "wrap" }}>
      {chars.map(char => <li key={char.name} styles={{padding: "1rem"}}><CharCard charId={char.id} /></li>)}
    </ul>
  )
}

function CharCard({ charId }) {
  const [char] = useSelector(state => state.characters.filter(character => character.id == charId))
  // const traits = char.traits // should be list
  return (
    <article>
      <h3>{char.name} </h3>
      <Button component={Link} to={`/${char.id}`} size="small" variant="outlined" color="secondary" style={{ margin: "0.5rem" }}>
        <small>Full Profile</small>
      </Button>
      <br />
      <img src="/assets/char-icon.png" alt="" style={{ width: "200px", height: "200px" }} />
      {/* <Link>Campaign "Blankety Blank"</Link> */}
      <nav>
        <IconButton color="primary">
          <List />
          {/* Expand Details */}
        </IconButton>
        <IconButton color="primary">
          <Edit />
          {/* Edit NPC */}
        </IconButton>
        <IconButton color="secondary">
          <Delete />
        </IconButton>
      </nav>
      <ul>
        <li>Essentials
            <ul>
            {char.traits.map(t => {
              return <li key={t.traitType}>{t.traitType.toUpperCase()}: {t.trait} </li>
            })}
          </ul>

        </li>
      </ul>
    </article>
  )
}
