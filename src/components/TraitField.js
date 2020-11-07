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

// *****************************************************************************

const filter = createFilterOptions()


export default function TraitField({ traitType, handleChange, fieldValues, setFieldValues }) {
  const dispatch = useDispatch()
  const [fieldValue, setFieldValue] = useState("")
  // const setting = useSelector(state => state.setting)

  // useEffect(() => {
  //   if (!setting[type.traitType]) dispatch(setSetting({ [type.traitType]: fieldValue }))

  // }, [])

  const handleChanges = (ev) => {

  }

  const getRandomTrait = (ev) => {
    let i
    do {
    i = Math.floor(Math.random() * Math.floor(traitType.traits.length))
    } while (fieldValue === traitType.traits[i].trait)
    console.log("what up with you?", i, traitType)
    setFieldValue(traitType.traits[i].trait)
    setFieldValues({ ...fieldValues, [traitType.type]: traitType.traits[i].trait })
    dispatch(updateSetting({ type: traitType.type, trait: traitType.traits[i].trait }))

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
