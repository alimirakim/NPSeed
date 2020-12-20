import React from 'react'
import { useSelector } from 'react-redux'


export default function TraitsOfType(traitType) {
  const traits = useSelector(state => state.traits)
  const tags = useSelector(state => state.tags)

  return (
    <section>
      <h3>Traits for {traitType.traitType}</h3>
      <ul>
        {traitType.traitIds.map(trid => {
          <li key={trid}>
            {traits[trid].trait}
            <small>
              <h4>TAGS</h4>
              <ul>
                {traits[trid].tagIds.map(tid => (
                  <li key={`tag ${tid}`}>{tags[tid].tag}</li>)
                )}
              </ul>
            </small>
          </li>
        })}
      </ul>
    </section>
  )
}


export function ViewOdds(traitType) {
  const tagTypes = useSelector(state => state.tagTypes)
  const tagTypeChances = useSelector(state => state.tagTypeChances)
  const tags = useSelector(state => state.tags)

  return (
    <section>
      {traitType.tagTypeIds.map(ttid => {

        return (<>
          <h4>{tagTypes[ttid]} Probabilities</h4>
          {tagTypeChances[ttid].tagChances.map(tc => {
            return <li key={`tag-chance ${tc.tag_id}`}>{tags[tc.tag_id]}: {tc.chance * 100}%</li>
          })}
        </>)
      })}
    </section>
  )
}