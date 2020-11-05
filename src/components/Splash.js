import { useState, useEffect } from 'react'
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

export default function Splash() {
  // TODO Is there any preference if both options are equally readable/convenient
  // for prop threading or for selecting for these scenarios?
  const dispatch = useDispatch()
  const hasToken = useSelector(state => state.authUser.token ? true : false)
  const user = useSelector(state => state.authUser.user)
  // const settings = useSelector(state => state.settings)
  const [settings, setSettings] = useState({})
  const generator = useSelector(state => state.generator)
  const traitTypes = useSelector(state => {
    const allTraitTypes = []
    for (let category of state.categories) {
      allTraitTypes.push(...category.traitTypes)
    }
    return allTraitTypes
  })
  const [nameVal, setNameVal] = useState("")

  useEffect(() => {
    if (!traitTypes.length) dispatch(getAllTraits())
  }, [])

  if (Object.keys(settings).length === 0 && traitTypes.length > 0) {
    const settingDefaults = {}
    for (const t of traitTypes) {
      settingDefaults[t.type] = ""
    }
    // const traitTypesList = traitTypes.map(t => {
      // return { [t.type]: "" }
    // })
    setSettings(settingDefaults)
  }

  // const updateChances = (genId) => (ev) => {
  //   dispatch(getChances(genId))
  // }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setSettings({...settings, ["Name"]: nameVal})
    console.log(settings)
  }
  const handleName = (ev) => {
    setNameVal(ev.target.value)
  }
  
  
  const randomizeNpc = () => {
    dispatch(setTraits(nameVal))
    

  }

  // {id: 1, genId: 1, tag: 'small', tagType: 'size', chance: 0.30}
  // const setChances = (chances) => ({type: SET_CHANCES, chances})
  // const getChances = (genId) => async (dispatch) => {
  //   const chances = await fetch(`/generator/${genId}/chances`)
  //   dispatch(setChances(chances))
  // }

  return (
    <article>
      {/* <h1>Welcome to NPSeed 🌱</h1>
        <ol style={{ display: "flex" }}>
          {steps.map(step => {
            return (
              <li key={steps.indexOf(step)} style={{ width: "30%" }}>
                <SplashStep step={step} />
              </li>
            )
          })}
        </ol>

          <Link to="/signup" hidden={hasToken}>Make an Account</Link>
          <Link to="/login" hidden={hasToken}>Login</Link> */}

      {/* <button onClick={updateChances(1)}>True Random Generator</button> */}
      {/* <button onClick={updateChances(2)}>Earth Random Generator</button> */}

      <form onSubmit={handleSubmit}>
        <label>Name
        <input type="text" value={nameVal} onChange={handleName} />
        </label><br />
        <button>Submit</button>
      </form>
      <button onClick={randomizeNpc}>Try it out!</button>

      <article>
        <h3>Random NPC</h3>
        {

        }
      </article>

      {/* <Link to="/generator">Generate Your NPC</Link> */}
      {/* <small hidden={hasToken}>No account needed to use this generator, but you can save your characters if you sign up!</small> */}
    </article>
  )
}




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
