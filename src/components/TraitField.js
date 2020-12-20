import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// MATERIAL-UI
import { TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

import {
  rollTagWithWeightedRandomChance,
  getRandomTrait,
} from './utils'

// MY COMPONENTS


// ACTIONS
import { setSetting, updateSetting } from '../store/actions/settingActions'
import { updateGenSetting } from '../store/actions/genSettingActions'
// *****************************************************************************

const filter = createFilterOptions()
console.log("filter", filter)
// *****************************************************************************


export default function TraitField({ traitT, traitsOfType }) {
  const dispatch = useDispatch()
  // console.log("traitT", traitT)
  const tagTypeChances = useSelector(state => state.generator.tagTypeChances)
  const genSettings = useSelector(state => state.genSettings)
  const [fieldValue, setFieldValue] = useState("")

  const handleChange = (e) => {
    setFieldValue(e.target.value)
  }

  // Select a weighted-random tag for each tag type based on generator chances,
  // Ignoring tags that have already been decided.
  function mapAndRollTagChances(tagTypeChances) {
    const allRolledTags = tagTypeChances.map(ttc => {
      // if (!genSettings[tagType.type]) { // NOTE This would limit results based on generator settings.
      // dispatch(updateGenSetting({ type: ttc.type, tag: rolledTag.tag }))
      return allRolledTags
      // } else {
      // return genSettings[tagType.type]
      // }
    })
    return allRolledTags
  }


  function getTraitTags(trait) {
    const traitTags = trait.tagTypes.map(tagType => {
      dispatch(updateGenSetting({ type: tagType.type, tag: tagType.tag }))
    })
  }
  // console.log("traitsOfType", traitsOfType)


  function handleChangeAlt(ev, newValue) {
    console.log("onChange ev, newValue", ev.target, newValue)
    if (typeof newValue === 'string') {
      setFieldValue(newValue)
      dispatch(updateSetting({ type: traitT.traitType, trait: newValue }))
      // } else if (newValue && newValue.inputValue) {
      //   setFieldValue(newValue.inputValue)
      //   dispatch(updateSetting({ type: traitT.traitType, trait: newValue.inputValue }))
    } else {
      setFieldValue(newValue.trait)
      dispatch(updateSetting({ type: traitT.traitType, trait: newValue.trait }))
      dispatch(updateGenSetting({ tagTypeId: traitT.tagTypeId, tagIds: newValue.trait.tagIds }))
    }
  }

  function handleChangeBalt(e) {
    console.log("onChange ev", e.target.value)
    if (typeof e.target.value === 'string') {
      setFieldValue(e.target.value)
      // } else if (newValue && newValue.inputValue) {
      //   setFieldValue(newValue.inputValue)
      //   dispatch(updateSetting({ type: traitT.traitType, trait: newValue.inputValue }))
    } else {
      setFieldValue(e.target.value.trait)
      dispatch(updateSetting({ type: traitT.traitType, trait: e.target.value.trait }))
      dispatch(updateGenSetting({ tagTypeId: traitT.tagTypeId, tagIds: e.target.value.trait.tagIds }))
    }
  }

  return (
    <>
      <h3>{traitT.traitType.toUpperCase()}</h3>

      <Autocomplete
        value={fieldValue}
        options={traitsOfType}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo

        onChange={handleChange}

        filterOptions={(options, params) => {
          // console.log("filterOptions", options)
          const filtered = filter(options, params)
          console.log("filterOptions", filtered, params)
          if (params.inputValue !== "") {
            filtered.unshift(`(Free Choice) ${params.inputValue}`)
          }
          return filtered
        }}

        getOptionLabel={(option, params) => {
          console.log("getOptionLabel param", option, params)
          if (typeof option === 'string') return option
          else if (option.inputValue) return option.inputValue
          else return option.trait
        }}

        renderOption={traitObj => {
          // { console.log("renderOption param", traitObj) }
          return traitObj.trait
        }}

        renderInput={(params) => {
          // console.log("textfield", fieldValue, params)
          return (
            <TextField
              {...params}
              onChange={handleChange}
              name={traitT.traitType}
              placeholder="Leave it to chance!"
              size="small"
            />
          )
        }}
      />

      {/* <small><nav>
        <ul>
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
      </nav></small> */}
    </>
  )
}
