import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getEstablishedTagIds,
  getApplicableTagIds,
  filterTraitsByTags,
  rollForNewTrait,
} from './utils'

import TraitList from './TraitList'
import TagOdds from './TagOdds'

// *****************************************************************************


export default function FieldButtons({ traitsOfType, traitType, handleChange, tagTypeIds }) {
  const settings = useSelector(state => state.setting)
  const traits = useSelector(state => state.traits)
  const tagTypes = useSelector(state => state.tagTypes)
  const tagTypeChances = useSelector(state => state.tagTypeChances)
  const [openTraits, setOpenTraits] = useState(false)
  const [openOdds, setOpenOdds] = useState(false)

  const handleGetRandomTrait = (e) => {
    const prevId = settings[traitType]

    const estTagIds = getEstablishedTagIds(settings, traits, prevId)
    const appTagIds = getApplicableTagIds(tagTypeIds, tagTypes, estTagIds, tagTypeChances)
    const traitsWithTags = filterTraitsByTags(tagTypeIds, appTagIds, traitsOfType, tagTypes)
    let trait = rollForNewTrait(traitsWithTags, prevId)

    // If randomizer returns no new result, do nothing
    if (trait) handleChange(e, trait)
  }

  const handleViewOdds = (e) => setOpenOdds(true)
  const handleSeeTraits = (e) => setOpenTraits(true)
  const handleSeeDetails = (e) => {}


  return (
    <>
      <TraitList open={openTraits} traitType={traitType} traitsOfType={traitsOfType} />
      <TagOdds open={openOdds} traitTagChances={traitTagChances} />

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
              onClick={handleSeeDetails}
              className="fas fa-question-circle">
              Details
            </button>
          </li>

          <li>
            <button type="button"
              onClick={handleViewOdds}
              className="fas fa-chart-pie">
              View Odds
            </button>
          </li>

        </ul>
      </nav>

      {isPopped && <>
        <Popup />
      </>}
    </>
  )
}
