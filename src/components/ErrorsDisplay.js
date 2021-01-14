import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function ErrorsDisplay() {
  // todo useEffect that wipes errors
  const errors = useSelector(state => state.errors)
  const [hasErrors, setHasErrors] = useState(false)
  if (errors.length && hasErrors === false) setHasErrors(true)
  return (
    <section hidden={!hasErrors}>
      <h3><strong>Sorry, we got some errors:</strong></h3>
      <ul>
        {errors.map((error, i) => {
          return <li key={i}>{error}</li>
        })}
      </ul>
    </section>
  )
}
