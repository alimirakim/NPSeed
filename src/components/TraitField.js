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
import { setSetting } from '../actions/settingActions'

// *****************************************************************************

const filter = createFilterOptions()






export default function TraitField({ traitType, handleChange }) {
  const dispatch = useDispatch()
  const [fieldValue, setFieldValue] = useState(null)
  // const setting = useSelector(state => state.setting)

  // useEffect(() => {
  //   if (!setting[type.traitType]) dispatch(setSetting({ [type.traitType]: fieldValue }))

  // }, [])

  const getRandomTrait = (ev) => {
    const i = Math.floor(Math.random() * Math.floor(traitType.traits.length))
    setFieldValue(traitType.traits[i])
    dispatch(setSetting({ [traitType.type]: traitType.traits[i] }))
    // ev.target.color = "primary"
    // TODO Double-check for off-by-one bugs
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
          if (params.inputValue !== "") {
            filtered.unshift(`(Free Choice) ${params.inputValue}`
            )
          }
          return filtered
        }}

        getOptionLabel={(t) => {
          if (typeof t === 'string') return t
          if (t.inputValue) return t.inputValue
          return t.trait
        }}

        renderOption={t => t.trait}

        renderInput={(params) => (
          <TextField {...params} placeholder="Leave it to chance!" variant="outlined" color="primary" />
        )}
      />

      <nav>
        <ul>
          <li>
            <label>View Odds<button>
              <PieChart />
            </button></label>
          </li>
          <li>
            <label>Randomize<button onClick={getRandomTrait}>
              <Casino />
            </button></label>
          </li>
          <li>
            <label>See All Traits<button>
              <Notes />
            </button></label>
          </li>
          <li>
            <label>Details<button>
              <HelpOutline />
            </button></label>
          </li>
        </ul>
      </nav>
    </>
  )
}


// *****************************************************************************

export function TraitFielddd({ type, setCurrentTraitTypes, open, setOpen }) {
  const dispatch = useDispatch()
  const [fieldValue, setFieldValue] = useState(null)
  const setting = useSelector(state => state.setting)

  useEffect(() => {
    if (!setting[type.traitType]) dispatch(setSetting({ [type.traitType]: fieldValue }))

  }, [])

  const getRandomTrait = (ev) => {
    const i = Math.floor(Math.random() * Math.floor(type.traits.length))
    setFieldValue(type.traits[i])
    dispatch(setSetting({ [type.traitType]: type.traits[i] }))
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
        options={type.traits}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo

        onChange={(ev, newValue) => {
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
          if (params.inputValue !== "") {
            filtered.unshift(`(Free Choice) ${params.inputValue}`
            )
          }
          return filtered
        }}

        getOptionLabel={(type) => {
          if (typeof type === 'string') return type
          if (type.inputValue) return type.inputValue
          return type.trait
        }}

        renderOption={trait => trait}

        renderInput={(params) => (
          <TextField {...params} placeholder="Leave it to chance!" variant="outlined" color="primary" />
        )}
      />

      <nav>
        <ul>
          <li>
            <label>View Odds<button>
              <PieChart />
            </button></label>
          </li>
          <li>
            <label>Randomize<button onClick={getRandomTrait}>
              <Casino />
            </button></label>
          </li>
          <li>
            <label>See All Traits<button onClick={showAllTraits}>
              {/* aria-label="open drawer" className={clsx(open && classes.hide)}> */}
              <Notes />
            </button></label>
          </li>
          <li>
            <label>Details<button>
              <HelpOutline />
            </button></label>
          </li>
        </ul>
      </nav>
    </>
  )
}
