import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// MATERIAL-UI
import { TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import {
  Notes,
  Casino,
  PieChart,
  HelpOutline,
} from '@material-ui/icons'
// import clsx from 'clsx';

// MY COMPONENTS


// ACTIONS
import { setSetting, updateSetting } from '../actions/settingActions'
import { updateGenSetting } from '../actions/genSettingActions'
// *****************************************************************************

const filter = createFilterOptions()


export default function TraitField({ traitType, handleChange, fieldValues, setFieldValues }) {
  const dispatch = useDispatch()
  const tagTypeChances = useSelector(state => state.generator.tagTypeChances)
  const genSettings = useSelector(state => state.genSettings)
  const [fieldValue, setFieldValue] = useState("")

  // TESTED
  function mapChancesToPercent(chances) {
    const total = chances.reduce((prev, current) => {
      const newChance = { ...current }
      newChance.chance = prev.chance + current.chance
      return newChance
    })
    return chances.map(c => {
      const chancePercent = { ...c }
      chancePercent.chance = c.chance / total.chance
      return chancePercent
    })
  }

  // TESTED
  function rollTagType(chances) {
    const rand = Math.random()
    console.log([rand, chances])
    let tag = null, i = 0, current = 0
    while (!tag && i < 10) {
      if (rand < chances[i].chance + current) tag = chances[i]
      current += chances[i].chance
      i++
    }
    return tag
  }
  
  function getTraitTags(trait) {
    const traitTags = trait.tagTypes.map(tagType => {
      dispatch(updateGenSetting({type: tagType.type, tag: tagType.tag}))
    })
  } 

  // TESTED
  function mapAndRollTagChances(tagTypes) {
    const allRolledTags = tagTypes.map(tagType => {
      // if (!genSettings[tagType.type]) { // NOTE This would limit results based on generator settings.
        const percentChances = mapChancesToPercent(tagType.chances)
        const rolledTag = rollTagType(percentChances)
        dispatch(updateGenSetting({type: tagType.type, tag: rolledTag.tag}))
        return rolledTag
      // } else {
        // return genSettings[tagType.type]
      // }
    })
    return allRolledTags
  }

  function filterTraitsByTags(tags, traits) {
    const tagIds = tags.map(tag => tag.tagId)
    const traitsWithTags = traits.filter(trait => {
      const traitTagIds = trait.tags.map(tag => tag.id)
      const traitHasIds = true
      for (const tagId of tagIds) {
        if (!traitTagIds.includes(tagId)) return false
      }
      return traitHasIds
    })
    return traitsWithTags
  }

  const getRandomTrait = (ev) => {
    const traitTypeTagTypeIds = traitType.tagTypes.map(tagType => tagType.id)
    const traitTypeTagTypeChances = tagTypeChances.filter(tagTypeChance => {
      if (traitTypeTagTypeIds.includes(tagTypeChance.typeId)) return tagTypeChance
    })
    const allRolledTags = mapAndRollTagChances(traitTypeTagTypeChances)
    let traitsWithTags = filterTraitsByTags(allRolledTags, traitType.traits)
    let i;
    let count = 0
    console.log("traitsWithTags", traitsWithTags)
    do {
      i = Math.floor(Math.random() * Math.floor(traitsWithTags.length))
      console.log("i", i)
      count++
    } while (fieldValue === traitsWithTags[i].trait && count < 10)
    setFieldValue(traitsWithTags[i].trait)
    setFieldValues({ ...fieldValues, [traitType.type]: traitsWithTags[i].trait })
    dispatch(updateSetting({ type: traitType.type, trait: traitsWithTags[i].trait }))
  }

  return (
    <>
      <h3>{traitType.type.toUpperCase()}</h3>

      <Autocomplete
        value={fieldValue}
        options={traitType.traits}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo

        onChange={(ev, newValue) => {
          // console.log("onChange ev, newValue", ev, newValue)
          if (typeof newValue === 'string') {
            setFieldValue(newValue)
            dispatch(updateSetting({ type: traitType.type, trait: newValue }))
          } else if (newValue && newValue.inputValue) {
            setFieldValue(newValue.inputValue)
            dispatch(updateSetting({ type: traitType.type, trait: newValue.inputValue }))
          } else {
            setFieldValue(newValue.trait)
            setFieldValues({ ...fieldValues, [traitType.type]: newValue.trait })
            dispatch(updateSetting({ type: traitType.type, trait: newValue.trait }))
            dispatch(updateGenSetting({type: traitType.tagType}))
            getTraitTags(newValue.trait)
          }
        }}

        filterOptions={(options, params) => {
          // console.log("filterOptions options, params", options, params)
          const filtered = filter(options, params)
          if (params.inputValue !== "") {
            filtered.unshift(`(Free Choice) ${params.inputValue}`)
          }
          return filtered
        }}

        getOptionLabel={(traitObj, params) => {
          // console.log("getOptionLabel param", traitObj, params)
          if (typeof traitObj === 'string') return traitObj
          if (traitObj.inputValue) return traitObj.inputValue
          return traitObj.trait
        }}

        renderOption={traitObj => {
          { console.log("renderOption param", traitObj) }
          return traitObj.trait
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleChange}
            name={traitType.type}
            placeholder="Leave it to chance!"
            size="small"
          />
        )}
      />

      <small><nav>
        <ul style={{ display: "flex" }}>
          <li>
            <label>View Odds<button type="button" >
              <PieChart />
            </button></label>
          </li>
          <li>
            <label>Randomize<button type="button" onClick={getRandomTrait}>
              <Casino />
            </button></label>
          </li>
          <li>
            <label>See All Traits<button type="button" >
              <Notes />
            </button></label>
          </li>
          <li>
            <label>Details<button type="button" >
              <HelpOutline />
            </button></label>
          </li>
        </ul>
      </nav></small>
    </>
  )
}


// *****************************************************************************

// export function TraitFielddd({ type, setCurrentTraitTypes, open, setOpen }) {
//   const dispatch = useDispatch()
//   const [fieldValue, setFieldValue] = useState(null)
//   const setting = useSelector(state => state.setting)

//   useEffect(() => {
//     if (!setting[type.traitType]) dispatch(setSetting({ [type.traitType]: fieldValue }))

//   }, [])

//   const getRandomTrait = (ev) => {
//     const i = Math.floor(Math.random() * Math.floor(type.traits.length))
//     setFieldValue(type.traits[i])
//     dispatch(setSetting({ [type.traitType]: type.traits[i] }))
//     // ev.target.color = "primary"
//     // TODO Double-check for off-by-one bugs
//   }

//   const showAllTraits = (ev) => {
//     setCurrentTraitTypes(type)
//     // setOpen(true);
//   }

//   return (
//     <>
//       <h3>{type.traitType.toUpperCase()}</h3>

//       <Autocomplete
//         value={fieldValue}
//         options={type.traits}
//         selectOnFocus
//         clearOnBlur
//         handleHomeEndKeys
//         freeSolo

//         onChange={(ev, newValue) => {
//           if (typeof newValue === 'string') {
//             setFieldValue(newValue)
//           } else if (newValue && newValue.inputValue) {
//             setFieldValue(newValue.inputValue)
//           } else {
//             setFieldValue(newValue)
//           }
//         }}

//         filterOptions={(options, params) => {
//           const filtered = filter(options, params)
//           if (params.inputValue !== "") {
//             filtered.unshift(`(Free Choice) ${params.inputValue}`
//             )
//           }
//           return filtered
//         }}

//         getOptionLabel={(type) => {
//           if (typeof type === 'string') return type
//           if (type.inputValue) return type.inputValue
//           return type.trait
//         }}

//         renderOption={trait => trait}

//         renderInput={(params) => (
//           <TextField {...params} placeholder="Leave it to chance!" variant="outlined" color="primary" />
//         )}
//       />

//       <nav>
//         <ul>
//           <li>
//             <label>View Odds<button>
//               <PieChart />
//             </button></label>
//           </li>
//           <li>
//             <label>Randomize<button onClick={getRandomTrait}>
//               <Casino />
//             </button></label>
//           </li>
//           <li>
//             <label>See All Traits<button onClick={showAllTraits}>
//               {/* aria-label="open drawer" className={clsx(open && classes.hide)}> */}
//               <Notes />
//             </button></label>
//           </li>
//           <li>
//             <label>Details<button>
//               <HelpOutline />
//             </button></label>
//           </li>
//         </ul>
//       </nav>
//     </>
//   )
// }
