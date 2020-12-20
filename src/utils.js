import { Today } from "@material-ui/icons"


// Return chances array after guaranteeing their sum total equals 1.0.
export function mapChancesToPercent(chances) {
  const total = chances.reduce((prev, current) => {
    const newChance = { ...current }
    newChance.chance = prev.chance + current.chance
    return newChance
  })
  return chances.map(c => {
    const chancePercent = { ...c }
    chancePercent.chance = c.chance / total.chance
    return chancePercent
  })
}


// Return random tag, based on given weighted random chances
export function rollForTag(tagChances) {
  let tagId;
  const rand = Math.random()
  let current = 0
  tagChances.forEach(tc => {
    if (rand <= tc.chance + current) return tagId = tc.tag_id
    current += tc.chance
  })
  // console.log("rollForTag", tagId)
  return tagId
}





export function getEstablishedTagIds(genSettings, traits, ignoreSetting) {
  const establishedTagIds = new Set()
  Object.values(genSettings).forEach(s => {
    // For individual randomizations, this prevents previous setting from
    // effecting the next result
    if (s === ignoreSetting) return
    if (typeof s === "number") {
      // console.log("trait", s, traits[s])
      traits[s].tagIds.forEach(tid => establishedTagIds.add(tid))
    }
  })
  // console.log("establishedTagIds", establishedTagIds)
  return Array.from(establishedTagIds)
}


export function getApplicableTagIds(applicableTagTypeIds, tagTypes, estTagIds, tagTypeChances) {
  const applicableTagIds = new Set()
  let chanced = false
  applicableTagTypeIds.forEach(ttid => {

    // Roll for 'chanceLock', which is a special probability that enables a
    // 'soft lock' feature to gate how likely a tag will 'lock' other traits to
    // match that tag. This does so by excluding tags for any tag TYPE that
    // rolls within the chanceLock range.
    const clRandom = Math.random()
    // console.log("PRE CHANCE LOCK", clRandom, tagTypeChances[ttid])
    if (clRandom <= tagTypeChances[ttid].chanceLock) {
      console.log("CHANCE LOCK", clRandom, tagTypeChances[ttid])
      chanced = true
      tagTypeChances[ttid].tagChances.forEach(tc => applicableTagIds.add(tc.tag_id))
    } else {

      // Only add traits that have at least one established tag in each
      const isEstablished = tagTypes[ttid].tagIds.some(tid => {
        if (estTagIds.includes(tid)) {
          applicableTagIds.add(tid)
          return true
        }
      })
      if (!isEstablished) applicableTagIds.add(rollForTag(tagTypeChances[ttid].tagChances))
    }
  })
  if (chanced) console.log("applicableTagIds", applicableTagIds)
  return Array.from(applicableTagIds)
}

// Loop through every required tag type
// Check if the trait has a tag id within that tag type's tags list AND the
// required tag Ids list. It must be present in both to count!
// Return true if so
export function filterTraitsByTags(requiredTagTypeIds, requiredTagIds, traits, tagTypes) {
  // console.log("requiredTagTypeIds", requiredTagTypeIds)
  // console.log("requiredTagIds", requiredTagIds)
  const traitsWithTags = traits.filter(trait => {

    // Traits without any tags set will be automatically included anyway
    if (trait.tagIds.length === 0) return true

    let includesAllTags = false
    requiredTagTypeIds.forEach(ttid => {
      const includesValidTag = trait.tagIds.some(tid => {
        // console.log("trait", trait, "tid", tid, "tagType", tagTypes[ttid])
        return requiredTagIds.includes(tid) && tagTypes[ttid].tagIds.includes(tid)
      })
      if (includesValidTag) includesAllTags = true
    })
    return includesAllTags
  })
  return traitsWithTags
}


// Initiate pure random roll to get result trait.
export function rollForNewTrait(traitsWithTags, prevId) {
  let i;

  // If there are no valid traits, return nothing
  if (traitsWithTags.length === 0) return

  // If more than one valid trait is available and replacing a previous result,
  // only return for a new result
  if (traitsWithTags.length > 1 && prevId) {
    do {
      i = Math.floor(Math.random() * Math.floor(traitsWithTags.length))
    } while (traitsWithTags[i].id === prevId)

    // Return the first random result
  } else {
    i = Math.floor(Math.random() * Math.floor(traitsWithTags.length))
  }

  return traitsWithTags[i]
}


// Initiate pure random roll to get result trait.
export function rollForTrait(traitsWithTags) {
  // console.log("traitsWithTags", traitsWithTags)
  // If there are no valid traits, return nothing
  if (traitsWithTags.length === 0) return
  let i;
  i = Math.floor(Math.random() * Math.floor(traitsWithTags.length))
  // console.log("rolled trait", traitsWithTags[i])
  return traitsWithTags[i]
}


// Check chanceLock before roll
export function chanceLock(tagTypeChances) {

}