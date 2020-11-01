import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import { getUserChars } from '../actions/charActions'

export default function Profile(props) {
  // console.log("profile props??", props)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  // if (!userId) userId = useSelector(state => state.user.id)
  const chars = useSelector(state => state.characters[user.id])
  // const user = useSelector(state => state)
  // if (user.id && !chars) dispatch(getUserChars(user.id))

  useEffect(() => {
    if (user.id && !chars) dispatch(getUserChars(user.id))
  }, [dispatch, user.id])

  // debugger
  if (!chars) return null

  return (
    <article id="home">
      <h2>{user.username}</h2>
      <small>Joined on {user.createdAt}.</small>

      <h2>{user.username}'s Characters</h2>
      <ul>
        {chars.map(char => {
          { console.log("trait options??", char.CharTraits) }
          return (
            <li>
              <img src="/assets/char-icon.png" alt={`Character portrait: ${char.name}`} />
              <a href={`/${char.id}`}>{char.name}</a>
              {/* <Link>Campaign "Blankety Blank"</Link> */}
              <nav>
                <ul>
                  <li>Essentials
                    <ul>
                      {char.CharTraits.map(trait => {
                        return <li>{trait.Trait.trait.toUpperCase()}: {trait.TraitOption.option} </li>
                    })}
                    </ul>
                  </li>
                  <li>Appearance
                    <ul>
                      <li>Hair: </li>
                      <li>Eyes: </li>
                      <li>Skin: </li>
                      <li>Build: </li>
                      <li>Attire: </li>
                      <li>Quirk: </li>
                    </ul>
                  </li>
                  <li>Abilities
                    <ul>
                      <li>Level/CR: </li>
                      <li>Class: </li>
                      <li>Abilities: </li> {/* Table for scores */}
                      <li>Proficiencies: </li> {/* Tools, languages, talents */}
                    </ul>
                  </li>
                  <li>Story
                    <ul>
                      <li>Residence: </li>
                      <li>Disposition: </li>
                      <li>History: </li>
                    </ul>
                  </li>
                </ul>
                <a href="/{charId}">Expand Details</a>
                <a href="/{charId}/edit">Edit NPC</a>
                <a href="/{charId}/delete">Delete NPC</a>
              </nav>
            </li>
          )
        })
        }
      </ul>
    </article>
  )
}