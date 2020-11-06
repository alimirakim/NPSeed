import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTraits } from '../actions/traitActions'




function NpcGenerator() {
  const categories = useSelector(state => state.categories)
  const [settings, setSettings] = useState({})

  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllTraits())
    }
  })

  if (!categories.length) return null

  const handleChange = (ev) => {
    setSettings({ ...settings, [ev.target.name]: ev.target.value })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

  }

  const defaultSettings = {}
  for (c in categories) {
    defaultSettings[c.category] = {}
    for (t in c.traitTypes) {
      defaultSettings[c.category][t.type] = ""
    }
  }
  setSettings(defaultSettings)

  return (
    <>
      <form onSubmit={handlSubmit}>
        {categories.map(c => {
          <p><b>Category:</b> {c.category}</p>
          {c.traitTypes.map(t => {
              <label>{t.type}
                <input name={t.type} type="text" value={settings[c].type} onChange={handleChange} />
              </label>
            })
          }
        })}
        <button>Submit</button>
      </form>

      <article id="npc-display">
        {categories.map(c => {
          <p><b>Category:</b> {c.category}</p>
          {
            c.traitTypes.map(t => {
              <p><b>{t.type}:</b> {}</p>
            })
          }
        })}
      </article>
    </>
  )
}



















// Below section is for mapping and generating chances for tag types
const colorValueChances = [
  {
    id: 1,
    tag: 'light',
    chance: 50,
  }, {
    id: 2,
    tag: 'dark',
    chance: 20,
  }, {
    id: 3,
    tag: 'midtone',
    chance: 30,
  }
]
const colorHueChances = [
  {
    id: 1,
    tag: 'natural',
    chance: 3,
  }, {
    id: 2,
    tag: 'fantasy',
    chance: 7,
  },
]
const hairChances = [colorValueChances, colorHueChances]







// TESTED
function mapChancesToPercent(chances) {
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

// TESTED
function rollTagType(chances) {
  const rand = Math.random()
  console.log([rand, chances])
  let tag = null, i = 0, current = 0
  while (!tag && i < 10) {
    if (rand < chances[i].chance + current) tag = chances[i]
    current += chances[i].chance
    i++
  }
  return tag
}

// TESTED
function mapAndRollTagChances(allChances) {
  const allRolledTags = allChances.map(chances => {
    const percentChances = mapChancesToPercent(chances)
    const rolledTag = rollTagType(percentChances)
    return rolledTag
  })
  console.log(allRolledTags)
  return allRolledTags
}

function rollForQuirkChance(tagType) {
  const rand = Math.random()
  const isQuirky = (rand > tagType.quirkChance)
  return isQuirky
}

function filterTraitsByTag(tag, traits) {
  const traitsWithTag = traits.filter(trait => {
    if (trait.tags.includes(tag)) return trait
  })
  return traitsWithTag
}
function filterTraitsByTags(tags, traits) {
  const traitsWithTags = traits.filter(trait => {
    let includesAllTags = true
    for (tag of tags) {
      if (!trait.tags.includes(tag)) includesAllTags = false
    }
  })
  return traitsWithTags
}

function randomizeTraits(traitTypes) {
  const traits = traitTypes.map(traitType => {
    const i = Math.floor(Math.random() * Math.floor(traitType.traits.length))
    return traitType.traits[i]
    // { 
    // id: traitType.id,
    // traitType: traitType.type,
    // trait: traitType.traits[i], 
    // {id: 1, trait: 'eliza', tags: [{id: 1, tag: 'blah'}]}
    // }
  })
  return traits
}


mapAndRollTagChances(hairChances)


// CONSTRAINT
// The result of each tag chance is global.
// If the tag for the 'gender' tag type ends up falling on 'girl', then *all*
// trait types with the 'gender' tag type will be restricted to girl-type tags.
// In addition, there is a special hidden 1% mechanism. The final randomization
// table, if it rolls 100, will secretly roll from the entire trait list without
// restraint. This could be an 'allow quirks' variable, so people can hard-lock
// to tag constraints as well. The 'allow quirks' variable can be adjusted too.
// translate this into a 'tagLock' variable that is associated with each tag
// type. Example, gender is given an 80% tagLock. So first it rolls for what the
// 'primary' gender tag is. Say female is the locked tag. Now, for every trait
// type that the gender tag type, they will then roll *again*, with 'girl' being
// 80% and all other options having a 20% chance.
// Typically would be put very low, 1% across the board, so that no combination
// is 'impossible'. If at 0, then it's a hard lock on that tag.
// 
