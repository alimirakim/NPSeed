
// function RandomizerButton() {
//   const traitTypes = useSelector(state => state.categories)

//   const randomizeAllTraits = () => {
//     const randomTraits = traitTypes.map(traitType => {
//       const newTraitType = {...traitType}
//       if (!traitType.current) newTraitType.current = randomizeTrait(traitType)
//       return traitType
//     })
//     dispatch(setSettings(randomTraits))
//   }


//   const randomizeTrait = (traitType) => {
//     const i = Math.floor(Math.random() * Math.floor(traitType.traits.length))
//     setFieldValue(traitType.traits[i])
//     dispatch(setSetting({ [traitType.type]: traitType.traits[i] }))
//     return { [traitType.type]: traitType.traits[i] }
//   }

//   return (
//     <button onClick={randomizeAllTraits}>
//       Big image of die here please
//       "Make an NPC!"
//     </button>
//   )
// }




// function CharDisplay() {
//   // NOTES Requires Tabs, editting/deleting/saving...
//   return (
//     <article>

//       tabs - categories
//       <header>
//         <h4>cat1Title</h4>
//         <nav>
//           <ul>
//             <li><button>Edit/Save</button></li>
//             <li><button>Delete</button></li>
//             <li><button>Share</button></li>
//           </ul>
//         </nav>
//       </header>

//       <ol>
//         {/* NOTE It may be easier to just make traits into 'disabled inputs' that are enabled on edit-mode */}
//         {/* NOTE BUT This would also require dropdown combobox and randomizer again etc. */}
//         {/* NOTE on clicking a mini-icon, show tags */}
//         <li key={0}>traitType: <input type="text" value="trait" placeholder="N/A" /></li>
//       </ol>

//       <button>+ Add new trait/section. Special option to add 'longform trait' for if they want detailed backstory etc. beyond their 'notes'.</button>

//       <section>
//         <h4>characterNameHere Notes</h4>
//         <textarea placeholder="Scratchpad for notes" />
//         {/* NOTE Add the special library to enable various customized writing options like bolding */}
//       </section>

//     </article>
//   )
// }