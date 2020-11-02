import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Tabs, Tab, Box, Button, ButtonGroup, IconButton } from '@material-ui/core'
import {
  Next
} from '@material-ui/icons'

// MY COMPONENTS
import TraitField from './TraitField'
import TraitDrawer from './TraitDrawer'
// import ClippedDrawer from './fuck'

// ACTIONS
import { getTraitsByCategory } from '../actions/traitActions'
import { clearSettings } from '../actions/settingActions'

// *****************************************************************************


function TabPanel(props) {
  const { children, value, index, ...rest } = props
  return (
    <section role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          {children}
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
      padding: theme.spacing(2, 4),
      margin: theme.spacing(0, 'auto', 4),
    },
    hide: {
      display: 'none',
    },
  }
}))

// *****************************************************************************

export default function GeneratorForm() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch()
  const traitTypes = useSelector(state => state.categories)
  const settings = useSelector(state => state.setting)
  const [currentTab, setCurrentTab] = useState(0)
  const [npc, setNPC] = useState([])
  const [gotResults, setGotResults] = useState(false)
  const [currentTraitTypes, setCurrentTraitTypes] = useState({ id: "", traitType: "", traits: [] })

  const traitTypes1 = traitTypes.filter(type => type.catId == 1)
  const traitTypes2 = traitTypes.filter(type => type.catId == 2)
  const traitTypes3 = traitTypes.filter(type => type.catId == 3)
  const traitTypes4 = traitTypes.filter(type => type.catId == 4)
  const traitTypes5 = traitTypes.filter(type => type.catId == 5)
  
  console.log("traitTypes groups", traitTypes1, traitTypes2, traitTypes3, traitTypes4, traitTypes5)

  useEffect(() => {
    if (!traitTypes.length) {
      dispatch(getTraitsByCategory(1))
      dispatch(getTraitsByCategory(3))
      dispatch(getTraitsByCategory(4))
      dispatch(getTraitsByCategory(2))
      dispatch(getTraitsByCategory(5))
    }
  }, [])

  const handleChange = (ev, value) => setCurrentTab(value)

  const makeNpc = (ev) => {
    if (gotResults) {
      dispatch(clearSettings())
    }
    const results = traitTypes.map(type => {
      console.log("settings?", settings)
      // if (Object.keys(settings).includes(type.traitType)) {
      if (settings[type.traitType]) {
        return { [type.traitType]: settings[type.traitType] }
      } else {
        const i = Math.floor(Math.random() * Math.floor(type.traits.length))
        return { [type.traitType]: type.traits[i] }
      }
    })
    console.log("results??", results)
    setGotResults(true)
    setNPC(results)
  }

  if (!traitTypes.length) return null

  return (
    <>
      <article id="generator" >
        <br />
        <br />
        <br />
        {/* <br/>
        <ButtonGroup variant="contained" color="secondary">
          <Button>Quick</Button>
          <Button>Standard</Button>
          <Button>Custom</Button>
        </ButtonGroup> */}

        <article>
          <Tabs value={currentTab} onChange={handleChange} style={{ marginTop: "4rem" }}>
            <Tab label="Essentials" />
            <Tab label="Appearance" />
            <Tab label="Personality" />
            <Tab label="Backstory" />
            <Tab label="Stats" />
          </Tabs>

          <TabPanel value={currentTab} index={0}>
            <ol>
              {traitTypes1.map(type => {
                return <li key={type.traitType}><TraitField type={type} setCurrentTraitTypes={setCurrentTraitTypes} /></li>
              })}
            </ol>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <ol>
              {traitTypes2.map(type => {
                return <li key={type.traitType}><TraitField type={type} setCurrentTraitTypes={setCurrentTraitTypes} /></li>
              })}
            </ol>
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <ol>
              {traitTypes3.map(type => {
                return <li key={type.traitType}><TraitField type={type} setCurrentTraitTypes={setCurrentTraitTypes} /></li>
              })}
            </ol>
          </TabPanel>

          <TabPanel value={currentTab} index={3}>
            <ol>
              {traitTypes4.map(type => {
                return <li key={type.traitType}><TraitField type={type} setCurrentTraitTypes={setCurrentTraitTypes} /></li>
              })}
            </ol>
          </TabPanel>

          <TabPanel value={currentTab} index={4}>
            <ol>
              {traitTypes5.map(type => {
                return <li key={type.traitType}><TraitField type={type} setCurrentTraitTypes={setCurrentTraitTypes} /></li>
              })}
            </ol>
          </TabPanel>
        </article>
        <br />
        <Button variant="contained" color="secondary" size="large" style={{ color: "teal", textAlign: "center" }} onClick={makeNpc}>GENERATE NPC</Button>
        <br />
        <br />

        <div>
          <Paper elevation={3} color="primary" style={{ width: "50%", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

            <h3 hidden={!gotResults} >RANDOM NPC RESULTS!</h3>
            <ul style={{ padding: "0" }}>
              {npc.map(type => {
                for (const thing in type) {
                  return <li style={{ listStyleType: "none" }}><b>{thing.toUpperCase()}:</b> {type[thing]}</li>
                }
              })}
            </ul>
          </Paper>
        </div>
        {/* <Button variant="outlined" color="primary">Skip</Button> */}
      </article>

      <TraitDrawer open={open} setOpen={setOpen} currentTraitTypes={currentTraitTypes} />
    </>
  )
}













// <IconButton
// color="inherit"
// aria-label="open drawer"
// edge="end"
// onClick={handleDrawerOpen}
// className={clsx(open && classes.hide)}
// >
// <MenuIcon />
// </IconButton>

// Authorization - signup, login, logout, reject wrong inputs,
// authorization --> personal profile page, edit profile, edit characters

// form --> 
// randomizer button


// validation Error, but migration worked