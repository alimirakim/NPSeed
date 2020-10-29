import React, { useState } from 'react'
import { Typography, Tabs, Tab, Box, Button, ButtonGroup, Link, Backdrop } from '@material-ui/core'
import { login } from '../actions/authActions'

function TabPanel(props) {
  const {children, value, index, ...rest} = props
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

export default function GeneratorForm() {
  const [value, setValue] = useState(0)

  const handleChange = (ev, value) => {
    setValue(value)
  }

  return (
    <article id="generator">
      <ButtonGroup variant="contained" color="secondary">
        <Button>Quick</Button>
        <Button>Standard</Button>
        <Button>Custom</Button>
      </ButtonGroup>


      <Tabs value={value} onChange={handleChange}>
        <Tab label="Name" />
        <Tab label="Race" />
        <Tab label="Age" />
        <Tab label="Gender" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* <TextField variant="filled" label="Name"> */}
        <input type="text" placeholder="Any. Optional: input directly" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Sup
      </TabPanel>

      <button>Skip</button>
    </article >
  )
}


// Authorization - signup, login, logout, reject wrong inputs,
// authorization --> personal profile page, edit profile, edit characters

// form --> 
// randomizer button


// validation Error, but migration worked