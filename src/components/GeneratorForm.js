import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { TextField, Typography, Tabs, Tab, Box, Button, ButtonGroup, IconButton } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { Casino, AddCircle, Cancel, Settings, PieChart, Notes, MorHoriz, Storage } from '@material-ui/icons'

const filter = createFilterOptions()

function TabPanel(props) {
  const { children, value, index, ...rest } = props
  return (
    <section role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </section>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      padding: theme.spacing(4, 10),
      margin: theme.spacing(4, 'auto'),
    }
  }
}))

export default function GeneratorForm() {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState(0)
  const [fieldValue, setFieldValue] = useState(null)
  const [charDraft, setCharDraft] = useState({
    name: "",
    race: "",
    age: "",
    gender: "",
    culture: "",
    occupation: "",
  })
  
  const handleChange = (ev, value) => {
    setCurrentTab(value)
  }

  return (
    <article id="generator" className={classes.root}>
      <ButtonGroup variant="contained" color="secondary">
        <Button>Quick</Button>
        <Button>Standard</Button>
        <Button>Custom</Button>
      </ButtonGroup>

      <article>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab label="Essentials" />
          <Tab label="Appearance" />
          <Tab label="Personality" />
          <Tab label="Story" />
          <Tab label="Stats" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          {/* <TextField variant="filled" label="Name"> */}





          <h3>Name</h3>
          <Autocomplete value={fieldValue}
            style={{ width: 300 }}
            freeSolo
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={[{ title: "insertBlahHere" }, { title: "oh oh oh?" }]}
            getOptionLabel={(option) => {
              if (typeof option === 'string') return option
              if (option.inputValue) return option.inputValue
              return option.title
            }}
            renderOption={option => option.title}
            onChange={(ev, val) => {
              if (typeof val === 'string') setFieldValue({ title: val })
              else if (val && val.inputVal) setFieldValue({ title: val.inputValue })
              else setFieldValue(val)
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              // Suggest creating new value
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `Add "${params.inputValue}"`,
                })
              }
              return filtered
            }}
            renderInput={(params) => (
              <TextField {...params} label="Name" variant="outlined" />
            )}
          />

          <IconButton color="primary">
            <PieChart />
          </IconButton>
          <IconButton color="secondary">
            <Casino />
          </IconButton>
          <IconButton color="primary">
            <Notes />
          </IconButton>

        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          Sup
      </TabPanel>
      </article>
      <br />
      <Button variant="outlined">Skip</Button>
    </article >
  )
}


// Authorization - signup, login, logout, reject wrong inputs,
// authorization --> personal profile page, edit profile, edit characters

// form --> 
// randomizer button


// validation Error, but migration worked