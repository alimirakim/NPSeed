import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// MATERIAL-UI
import { TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

// COMPONENTS
import FieldButtons from './FieldButtons'

// ACTIONS
import { updateGenSetting } from '../store/actions/genSettingActions'

// *****************************************************************************

const filter = createFilterOptions()

// *****************************************************************************


export default function TraitField({ traitType, traitsOfType, tagTypeIds }) {
  const dispatch = useDispatch()
  const [value, setValue] = useState({ trait: "", tagIds: [] })
  console.log("traitType from Splash", traitType)
  
  useEffect(() => {
    
    if (value && value.id) {
      dispatch(updateGenSetting({ traitType: traitType.traitType, trait: value.id }))
    } else if (value) {
      dispatch(updateGenSetting({ traitType: traitType.traitType, trait: value.trait }))
    } else {
      dispatch(updateGenSetting({ traitType: traitType.traitType, trait: "" }))
      
    }
  }, [value])

  const handleChange = (e, newVal) => {
    if (typeof newVal === "string") setValue({ trait: newVal, tagIds: [] })
    else if (newVal && newVal.inputValue) setValue({ trait: newVal.inputValue, tagIds: [] })
    else setValue(newVal)
  }

  const handleFilter = (options, params) => {
    const filtered = filter(options, params)
    // Suggest creating new value
    if (params.inputValue !== "") {
      filtered.unshift(
        { inputValue: params.inputValue, trait: `(Custom) ${params.inputValue}` }
      )
    }
    return filtered
  }

  const handleOptionLabel = (option) => {
    // Value selected with Enter, right from the input
    if (typeof option === "string") return option
    // Add 'xxx' option created dynamically
    else if (option.inputValue) return option.inputValue
    // Normal option
    else return option.trait
  }

  return (
    <>
      <Autocomplete
        style={{ width: 300 }}
        value={value}
        options={traitsOfType}
        getOptionLabel={handleOptionLabel}
        onChange={handleChange}
        filterOptions={handleFilter}
        renderOption={(option) => option.trait}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        renderInput={(params) => <TextField {...params} label={traitType.traitType} />}
      />

      <FieldButtons
        traitsOfType={traitsOfType}
        traitType={traitType}
        handleChange={handleChange}
        tagTypeIds={tagTypeIds}
      />
      
      
      
    </>
  )
}


// TODO
// tabs
// Create popup for ViewOdds, SeeTraits
// Style results display
// Style customizer form -> LayersOutlined, buttons
// Create 'tag settings' sidebar showing currently set tags

// Create character-saving option
// Use recharts to display pie chart breakdown
// Populate with shit-ton of seeder data

// Push to heroku

// Incorporate chanceLock to chances
// Check that the options allows for multiple settings for the same tag Type
// Create 'tag types' board that allows direct tag-setting customization
