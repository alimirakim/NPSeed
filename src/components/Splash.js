import { useReducer, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// MY COMPONENTS


// ACTIONS
import { SET_CHANCES, getAllTraits, setTraits } from '../actions/traitActions'
// import {setAllTraits} from '../actions/settingActions'

// *****************************************************************************

// const steps = [
//   "Choose a randomizer setting.",
//   "Customize any options you'd like, or just leave every NPC trait up to chance.",
//   "Click the button and see your new NPC!",
// ]

// function SplashStep({ step }) {
//   return (
//     <figure>
//       <img src="" alt="" style={{ width: "200px", height: "200px" }} />
//       <figcaption>
//         {step}
//       </figcaption>
//     </figure>
//   )
// }

// *****************************************************************************

function settingReducer(state, action) {
  debugger
  switch (action.type) {
    case 'update_settings':
      debugger
      const newState = { ...state, ...action.traitTypes }
      debugger
      return newState
  }
}

export default function Splash() {
  // const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)

  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllTraits())
    }
  }, [])
  // debugger

  const handleChange = (ev) => {
    // setSettings({ ...settings, [ev.target.name]: ev.target.value })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

  }
  
  const defaultSettings = {}
  for (const c of categories) {
    debugger
    defaultSettings[c.category] = {}
    for (const t of c.traitTypes) {
      defaultSettings[c.category][t.type] = ""
    }
  }
  let [settings, dispatch] = useReducer(settingReducer, defaultSettings)
  // dispatch({type: 'update_settings', traitTypes: defaultSettings})
  debugger
  console.log("settings", settings)
  
  if (!categories.length) return null


  return (
    <>
      <form onSubmit={handleSubmit}>
        {categories.map(c => {
          <p><b>Category:</b> {c.category}</p>
          { c.traitTypes.map(t => {
              { console.log("c", c) }
              <label>{t.type}
                <input name={t.type} type="text" value={settings[c][t.type]} onChange={handleChange} />
              </label>
            })
          }
        })}
        <button>Submit</button>
      </form>

      <article id="npc-display">
        {categories.map(c => {
          <p><b>Category:</b> {c.category}</p>
          {
            c.traitTypes.map(t => {
              <p><b>{t.type}:</b> {}</p>
            })
          }
        })}
      </article>
    </>
  )
}



// state.categories[0].traitTypes[0].current

// state 'categories' change to 'traits'
// {catId, traitType, traitsList, current}

// randomize = true random for now
// on click/randomization, it changes everything except those items which have been set explicitly.

// 1. Splash taster-randomizer
// 2. Full list =>
//   off-clicker, removes/re-adds option
//   all-clicker, turns all off/on. if all off, 'N/A'
//   add-input at top of list. first time, turns off everything else.
//   add another. able to add as many as wanted.
//   click mini+tag to add from a list of tags, each grouped by type in separate
//   sections. each section, can add/delete tags.
//   click a top button to add tag sections
