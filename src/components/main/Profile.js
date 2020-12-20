import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// MY COMPONENTS

// ACTIONS
import { getUserChars } from '../../store/actions/charActions'

// *****************************************************************************

export default function Profile() {
  {/* let user; */ }
  // TODO This will actually need dispatch to work
  {/* if (props.match.params.id) user = useSelector(state => state.users.props.match.params.id) */ }
  {/* else user = useSelector(state => state.authUser.user) */ }
  const user = useSelector(state => state.authUser.user)
  user.createdAt = user.createdAt.toLocaleString()
  
  return (
    <article>
      <h1>{user.username}</h1>
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
    <ul>
      {chars.map(char => <li key={char.name}><CharCard charId={char.id} /></li>)}
    </ul>
  )
}

function CharCard({ charId }) {
  const [char] = useSelector(state => state.characters.filter(character => character.id == charId))
  // const traits = char.traits // should be list
  return (
    <article>
      <h3>{char.name} </h3>
      <Link to={`/${char.id}`}><small>Full Profile</small></Link>
      <img src="/assets/char-icon.png" alt={`Character portrait of ${char.name}`} />
      <nav>
        <ul>
          <li>Expand details</li>
          <li>Edit Character</li>
          <li>Delete</li>
        </ul>
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
