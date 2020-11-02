import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

// MATERIAL-UI
import { TextField, IconButton } from '@material-ui/core'
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete'
import {
  Notes,
  Casino,
  PieChart,
} from '@material-ui/icons'
// import clsx from 'clsx';

// MY COMPONENTS


// ACTIONS
import {setSetting} from '../actions/settingActions'

const filter = createFilterOptions()

export default function TraitField({ type, setCurrentTraitTypes, open, setOpen }) {
  const dispatch = useDispatch()
  const [fieldValue, setFieldValue] = useState(null)
  const setting = useSelector(state => state.setting)
  
  useEffect(() => {
    if (!setting[type.traitType]) dispatch(setSetting({[type.traitType]: fieldValue}))
    
  }, [])
    // const classes = useStyles()
  
  const getRandomTrait = (ev) => {
    const i = Math.floor(Math.random() * Math.floor(type.traits.length))
    setFieldValue(type.traits[i])
    console.log("field value?", type.traits[i], fieldValue)
    dispatch(setSetting({[type.traitType]: type.traits[i]}))
    // ev.target.color = "primary"
    // TODO Double-check for off-by-one bugs
  }

  const showAllTraits = (ev) => {
    setCurrentTraitTypes(type)
    // setOpen(true);
  }

  return (
    <>
      <h3>{type.traitType.toUpperCase()}</h3>

      <Autocomplete
        value={fieldValue}

        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setFieldValue(newValue)
          } else if (newValue && newValue.inputValue) {
            setFieldValue(newValue.inputValue)
          } else {
            setFieldValue(newValue)
          }
        }}

        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          // Suggest creating new value
          if (params.inputValue !== "") {
            filtered.unshift(`(Free Choice) ${params.inputValue}`
            )
          }
          return filtered
        }}

        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={type.traits}

        getOptionLabel={(type) => {
          if (typeof type === 'string') return type
          if (type.inputValue) return type.inputValue
          return type.trait
        }}

        renderOption={trait => trait}

        style={{ width: 300, }}
        freeSolo

        renderInput={(params) => (
          <TextField {...params} placeholder="Leave it to chance!" variant="outlined" color="primary" />
        )}
      />

      {/* <IconButton color="primary"> */}
        {/* <PieChart label="View Odds" /> */}
      {/* </IconButton> */}
      <IconButton onClick={getRandomTrait} color="secondary" >
        <Casino label="Randomize" />
      </IconButton>
      <IconButton onClick={showAllTraits} color="primary">
         {/* aria-label="open drawer" className={clsx(open && classes.hide)}> */}
        <Notes label="See all" />
      </IconButton>
    </>
  )
}
