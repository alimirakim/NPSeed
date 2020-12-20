import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getEstablishedTagIds,
  getApplicableTagIds,
  filterTraitsByTags,
  rollForNewTrait,
} from '../utils'

import TraitListView from './TraitListView'
import TagOddsView from './TagOddsView'

// *****************************************************************************


export default function FieldButtons({ traitsOfType, traitType, handleChange, tagTypeIds }) {
  const settings = useSelector(state => state.setting)
  const traits = useSelector(state => state.traits)
  const tagTypes = useSelector(state => state.tagTypes)
  const tagTypeChances = useSelector(state => state.tagTypeChances)
  const [openTraits, setOpenTraits] = useState(false)
  const [openOdds, setOpenOdds] = useState(false)

  const handleGetRandomTrait = (e) => {
    const prevId = settings[traitType.traitType]

    const estTagIds = getEstablishedTagIds(settings, traits, prevId)
    const appTagIds = getApplicableTagIds(tagTypeIds, tagTypes, estTagIds, tagTypeChances)
    const traitsWithTags = filterTraitsByTags(tagTypeIds, appTagIds, traitsOfType, tagTypes)
    let trait = rollForNewTrait(traitsWithTags, prevId)

    // If randomizer returns no new result, do nothing
    if (trait) handleChange(e, trait)
  }

  const handleViewOdds = (e) => setOpenOdds(!openOdds)
  const handleSeeTraits = (e) => setOpenTraits(!openTraits)
  const handleSeeDetails = (e) => { }


  return (
    <>

      {openTraits && <>
        <div className="lo-pop lo-center">
          <button onClick={handleSeeTraits} className="lo-x">&times;</button>
          <TraitListView traitType={traitType.traitType} traitsOfType={traitsOfType} />
        </div>
        <div className="lo-screen"></div>
      </>}

      {openOdds && <>
        <div className="lo-pop lo-center">
          <button onClick={handleViewOdds} className="lo-x">&times;</button>
          <TagOddsView traitType={traitType} />
        </div>
        <div className="lo-screen"></div>
      </>}

      <nav>
        <ul>

          <li>
            <button type="button"
              onClick={handleGetRandomTrait}
              className="fas fa-dice-d20">
              Randomize
            </button>
          </li>

          <li>
            <button type="button"
              onClick={handleSeeTraits}
              className="fas fa-list">
              See All Traits
            </button>
          </li>

          <li>
            <button type="button"
              onClick={handleViewOdds}
              className="fas fa-chart-pie">
              View Odds
            </button>
          </li>

          <li>
            <button type="button"
              onClick={handleSeeDetails}
              className="fas fa-question-circle">
              Details
            </button>
          </li>

        </ul>
      </nav>
    </>
  )
}
