import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// MY COMPONENTS


// ACTIONS
import { SET_CHANCES, getAllTraits, setTraits } from '../actions/traitActions'
import { setSettings, updateSetting, } from '../actions/settingActions'
import { getGenerator } from '../actions/genActions'
import { getGenSettings } from '../actions/genSettingActions'
import TraitField from './TraitField'

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
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  const settings = useSelector(state => state.setting)
  const generator = useSelector(state => state.generator)
  const genSettings = useSelector(state => state.genSettings)
  const [fieldValues, setFieldValues] = useState({})

  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllTraits())
    }
    if (!generator.id) {
      dispatch(getGenerator(2))
    } else {
      dispatch(setSettings(categories))
      console.log("generator.tagTypeChances", generator.tagTypeChances)
      dispatch(getGenSettings(generator.tagTypeChances))
    }
  }, [categories, generator])

const handleChange = (ev) => {
  console.log("test?")
  console.log({ type: ev.target.name, trait: ev.target.value })
  dispatch(updateSetting({ type: ev.target.name, trait: ev.target.value }))
  setFieldValues({ ...fieldValues, [ev.target.name]: ev.target.value })
}

const handleSubmit = (ev) => {
  ev.preventDefault()
  console.log("field values?", fieldValues)
  categories.map(c => {
    c.traitTypes.map(t => {
      if (fieldValues[t.type]) {
        return { [t.type]: settings[t.type] }
      } else if (t.traits.length === 0) {
        return { [t.type]: "" }
      } else {
        const i = Math.floor(Math.random() * Math.floor(t.traits.length))
        dispatch(updateSetting({ type: t.type, trait: t.traits[i].trait }))
      }
    })
  })
}

if (!categories.length || !Object.keys(settings).length) return null

return (
  <>
    <form onSubmit={handleSubmit}>
      <h2>Customize Options</h2>
      {categories.map(c => (
        <>
          <h3><b>Category:</b> {c.category}</h3>
          {c.traitTypes.map(t => (
            <>
              <br />
              <label>{t.type}:
                <TraitField traitType={t} handleChange={handleChange} fieldValues={fieldValues} setFieldValues={setFieldValues} />
              </label>
            </>
          ))}
        </>
      ))}
      <br />
      <button>Submit</button>
    </form>

    <article id="npc-display">
      <h2>NPC Results</h2>
      {categories.map(c => (
        <>
          <h3><b>Category:</b> {c.category}</h3>
          {c.traitTypes.map(t => {
            {/* console.log("this is...", settings[c.category]) */ }
            {/* console.log("this T is...", t.type) */ }
            return (
              <div><b>{t.type}:</b> {settings[t.type]}</div>
            )
          })}
        </>
      ))}
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
