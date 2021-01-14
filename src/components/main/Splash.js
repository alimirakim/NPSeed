import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { basePath } from '../../config'

import {
  getEstablishedTagIds,
  getApplicableTagIds,
  filterTraitsByTags,
  rollForTrait
} from '../../utils'


// MY COMPONENTS
import ResultDisplay from '../ResultDisplay'

// ACTIONS
import { setAllContent } from '../../store/actions/traitActions'
import { updateSetting, } from '../../store/actions/settingActions'
import { setGenerator } from '../../store/actions/genActions'
import TraitField from '../TraitField'

// *****************************************************************************

// const steps = [
//   "Choose a randomizer setting.",
//   "Customize any options you'd like, or just leave every NPC trait up to chance.",
//   "Click the button and see your new NPC!",
// ]

// function SplashStep({ step }) {
//   return (
//     <figure>
//       <img src="" alt="" />
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
  const traitTypes = useSelector(state => state.traitTypes)
  const traits = useSelector(state => state.traits)
  const tagTypes = useSelector(state => state.tagTypes)
  const tagTypeChances = useSelector(state => state.tagTypeChances)
  const genSettings = useSelector(state => state.genSettings)

  useEffect(() => {
    // TODO Create action creator that does both simultaneously
    if (!Object.keys(categories).length) {
      (async () => {
        const resCat = await fetch(`${basePath}/categories/all`)
        const content = await resCat.json()
        dispatch(setAllContent(content))

        const id = 2
        const resGen = await fetch(`${basePath}/generators/chances/${id}`)
        const { generator, tagTypeChances } = await resGen.json()
        dispatch(setGenerator(generator, tagTypeChances))

      })()
    }
  }, [])


  const handleSubmit = (ev) => {
    ev.preventDefault()
    Object.values(traitTypes).forEach(traitType => {
      if (!genSettings[traitType.traitType]) {
        const traitsOfType = Object.values(traits).filter(t => traitType.traitIds.includes(t.id))

        const estTagIds = getEstablishedTagIds(genSettings, traits)
        const appTagIds = getApplicableTagIds(traitType.tagTypeIds, tagTypes, estTagIds, tagTypeChances)
        const traitsWithTags = filterTraitsByTags(traitType.tagTypeIds, appTagIds, traitsOfType, tagTypes)
        let trait = rollForTrait(traitsWithTags)

        dispatch(updateSetting({traitType: traitType.traitType, trait: trait.id}))
      }
    })
  }

  console.log("in splash")
  if (!Object.keys(categories)) return null
  console.log("got cats")

  return (
    <>
      <h1>NPSEED</h1>

      <ResultDisplay />

      <form onSubmit={handleSubmit}>

        <h2>Customize Options</h2>

        <button>Submit</button>

        {Object.values(categories).map(c => (
          <>
            <h3>Category: {c.category}</h3>
            {c.traitTypeIds.map(ttid => {
              return (<TraitField
                traitType={traitTypes[ttid]}
                traitsOfType={Object.values(traits).filter(t => traitTypes[ttid].traitIds.includes(t.id))}
                tagTypeIds={traitTypes[ttid].tagTypeIds}
              />)
            })}
          </>
        ))}

      </form>
      
      


    </>
  )
}