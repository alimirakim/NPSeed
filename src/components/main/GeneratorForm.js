import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// MATERIAL-UI
import {Tabs, Tab } from '@material-ui/core'


// MY COMPONENTS
import TraitField from '../TraitField'
import TraitDrawer from '../TraitDrawer'

// ACTIONS
import { clearSettings } from '../../store/actions/settingActions'

// *****************************************************************************


function TabPanel(props) {
  const { children, value, index, ...rest } = props
  return (
    <section role="tabpanel" hidden={value !== index}>
      {value === index && (
          <p>{children}</p>
      )}
    </section>
  )
}

// *****************************************************************************

export default function GeneratorForm() {
  const dispatch = useDispatch()
  const traitTypes = useSelector(state => state.categories)
  const settings = useSelector(state => state.setting)
  const [currentTab, setCurrentTab] = useState(0)
  const [open, setOpen] = React.useState(false);
  const [npc, setNPC] = useState([])
  const [gotResults, setGotResults] = useState(false)
  const [currentTraitTypes, setCurrentTraitTypes] = useState({ id: "", traitType: "", traits: [] })

  const traitTypes1 = traitTypes.filter(type => type.catId == 1)
  const traitTypes2 = traitTypes.filter(type => type.catId == 2)
  const traitTypes3 = traitTypes.filter(type => type.catId == 3)
  const traitTypes4 = traitTypes.filter(type => type.catId == 4)
  const traitTypes5 = traitTypes.filter(type => type.catId == 5)
  
  useEffect(() => {
    if (!traitTypes.length) {
    }
  }, [])

  const handleChange = (ev, value) => setCurrentTab(value)

  const makeNpc = (ev) => {
    const results = traitTypes.map(type => {
      if (settings[type.traitType]) {
        return { [type.traitType]: settings[type.traitType] }
      } else {
        const i = Math.floor(Math.random() * Math.floor(type.traits.length))
        return { [type.traitType]: type.traits[i] }
      }
    })
    setGotResults(true)
    setNPC(results)
  }

  if (!traitTypes.length) return null

  return (
    <>
      <article id="generator" >
          <button>Quick</button>
          <button>Standard</button>
          <button>Custom</button>

        <article>
          <Tabs value={currentTab} onChange={handleChange}>
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
        <button onClick={makeNpc}>GENERATE NPC</button>

        <div>
            <h3 hidden={!gotResults} >RANDOM NPC RESULTS!</h3>
            <ul>
              {npc.map(type => {
                for (const thing in type) {
                  return <li>{thing.toUpperCase()}: {type[thing]}</li>
                }
              })}
            </ul>
        </div>
        <button>Skip</button>
      </article>

      <TraitDrawer open={open} setOpen={setOpen} currentTraitTypes={currentTraitTypes} />
    </>
  )
}
