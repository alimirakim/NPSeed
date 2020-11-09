

export const currentUser = [{
  id: 1,
  username: "eyyy",
  token: "blah",
  email: "email@blah",
  createdAt: "blah",
  characters: [{ id: 1, name: "woah" }]
}]

// quickcard data only?
// state.characters[0].categories[0].charTraits[0].trait // "elizabeth"
export const userCharacters = [{
  id: 1,
  name: "ehhh",
  campaign: "mehhh",
  categories: [{
    id: 1,
    category: "essentials",
    charTraits: [{
      typeId: 1,
      type: 'name',
      traitId: 1,
      trait: 'elizabeth',
      tagTypes: [{
        typeId: 1,
        type: "gender",
        tagId: 1,
        tag: "girly"
      }]
    }]
  }]
}]

export const currentCharacter = {
  id: 1,
  name: "ehhh",
  campaign: "mehhh",
  categories: [{
    id: 1,
    category: "essentials",
    charTraits: [{
      typeId: 1,
      type: 'name',
      traitId: 1,
      trait: 'elizabeth',
      tagTypes: [{
        typeId: 1,
        type: "gender",
        tagId: 1,
        tag: "girly"
      }]
    }]
  }]
}

// state.current[0].traitTypes[0].type // "name"
// state.current[0].traitTypes[0].trait // "elizabeth"
// state.current[0].traitTypes[0].tagTypes[0].type // "gender"
// state.current[0].traitTypes[0].tagTypes[0].tag // "girly"
export const currentTraits = [{
  catId: 1,
  category: "essentials",
  traitTypes: [{
    typeId: 1,
    type: 'name',
    traitId: 1,
    trait: 'elizabeth',
    tagTypes: [{
      typeId: 1,
      type: "gender",
      tagId: 1,
      tag: "girly"
    }]
  }]
}]

export const currentGen = {
  id: 1,
  title: "Earthy",
  tagTypes: [{
    id: 1,
    type: "gender",
    quirkChance: 0.01,
    tagChances: [{
      id: 1,
      GeneratorId: 1,
      TagTypeId: 1,
      TagId: 1,
      tag: { id: 1, tag: "girly" },
      chance: 0.45,
    }]
  }]
}

// state.categories[0].traitTypes[0].traits[0].tags[0].id // 1
export const categories = [{
  id: 1,
  category: 'essentials',
  traitTypes: [{
    id: 1,
    type: 'name',
    tagTypes: [
      { id: 1, type: 'gender' },
      { id: 2, type: 'hemisphere' },
      { id: 3, type: 'first letter' }
    ],
    traits: [{
      id: 1,
      trait: 'elizabeth',
      tags: [
        { id: 1, tag: 'western' },
        { id: 2, tag: 'starts with e' },
        { id: 3, tag: 'girly' }
      ]
    }]
  }]
}]














// const categories = [{
//   id: 1,
//   category: 'essentials',
//   traitTypes: ['age', 'gender', 'name'],
// }]
// const traitTypes = [{
//   id: 1,
//   cat: { id: 1, cat: 'essentials' },
//   type: 'age',
//   traits: ['young', 'old'],
// }]
// const traits = [{
//   id: 1,
//   type: { id: 1, type: 'age' },
//   trait: '55',
//   tags: ['old (human age)', '50s (age range)', 'human (race)', 'elven (race)', 'dwarven (race)']
// }]
// const tagTypes = [{
//   id: 1,
//   type: 'human age',
//   tags: ['young', 'adult', 'old'],
// },
// {
//   id: 2,
//   type: 'theme',
//   tags: ['flowery', 'gemstones', 'nature', 'astronomy'],
// }
// ]
// const tags = [{
//   id: 1,
//   tagType: { id: 1, type: 'human age' },
//   tag: 'young',
// }]
// const chances = [{
//   id: 1,
//   gen: { id: 1, title: "Earthy" },
//   tagType: { id: 1, type: "age" },
//   tag: { id: 1, tag: "old" },
//   chance: 0.23,
// }]
// const quirkChances = [{
//   id: 1,
//   gen: { id: 1, title: "Earthy" },
//   tagType: { id: 1, type: "age" },
//   chance: 0.01,
// }]
// QuirkChance = 
// {
//   id: 1,
//   tagTypeId: 1,
//   quirkChance: 0.01,
// }