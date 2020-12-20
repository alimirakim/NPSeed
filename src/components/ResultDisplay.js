import React from 'react'
import { useSelector } from 'react-redux'



export default function ResultDisplay() {
  const categories = useSelector(state => state.categories)
  const traitTypes = useSelector(state => state.traitTypes)
  const traits = useSelector(state => state.traits)
  const settings = useSelector(state => state.setting)

  if (!Object.keys(categories)) return null

  return (
    <article id="npc-display">
      <h2>Character Results</h2>
      {Object.values(categories).map(c => (<>
        <h3 key={c.id}>CATEGORY {c.category}</h3>
        <dl>
          {c.traitTypeIds.map(ttid => {
            const setting = settings[traitTypes[ttid].traitType]
            let displaySetting;
            if (typeof setting === "number") displaySetting = traits[setting].trait
            else if (typeof setting === "string") displaySetting = setting
            return (<>
              <dt key={ttid}>{traitTypes[ttid].traitType}: </dt>
              <dd>{displaySetting}</dd>
            </>)
          })}
        </dl>
      </>))}
    </article>
  )
}