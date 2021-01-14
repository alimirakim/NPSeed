import React from 'react'
import { useSelector } from 'react-redux'


export default function TraitsOfType({open, traitsOfType}) {
  const tags = useSelector(state => state.tags)

  if (!open) return null
  
  return ( <>
    <section>
      {/* <h3>Traits for {traitType.traitType}</h3> */}
      <ul>
        {traitsOfType.map(trait => {
          <li key={`trait ${trait.id}`}>
            {trait.trait}
            <small>
              <h4>TAGS</h4>
              <ul>
                {trait.tagIds.map(tid => (
                  <li key={`tag ${tid}`}>{tags[tid].tag}</li>)
                )}
              </ul>
            </small>
          </li>
        })}
      </ul>
    </section>
    <div className="lo-screen"></div>
  </> )
}
