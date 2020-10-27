

README.md

<!-- **[Live site](tba)** -->

**Description**
This app lets a user randomly generate an NPC character for DND or other story/game purposes.
A lazy-app-tool for people who need filler content fast, general inspiration, or some help
finalizing the details of their own characters.
*Potential name ideas: NPSeed, Karagen, Charagen, Atelier Pygmalia, CharaCraft...*

## Minimal Viable Product (MVP)
* User accounts and login.
* Random generation character form.
* Ability to customize randomizer options.
* User able to save characters.

## Feature List
* (MVP) User accounts - can save characters and maker-settings
* (MVP) Random character generator - quick-build, standard-form
* (MVP) Character pages
* Character sheet printable, mini-format
* Weighted randomization odds
* Customizable settings - adding categories, options, odds
* Generator maker - able to give name and options and add options.

**Details**
- User account (sign-up, sign-in, sign-out)
  - Guest
  - Saved named custom settings
  - Saved characters
  - Profile - settings, characters (public, private)

- Random character-generator form
  - quick-build
  - Weighted random option
  - Use custom setting template
  - Chronological sections
  - Skip option
  - Save draft
  - Save settings
  - Input options: dropdown, write-in, add option
  - View all
    - On/off/sliding bar (20-increment or write-in 0-100)
    - Pie chart - click to adjust all
  - Save individual section settings
  - Add custom setting and options

- Character sheet
  - Public/private
  - First page: essentials, image icon, color/background-texture, elevator pitch
  - EZ-edit fill-out spots
  - PDF/print option
  - Multi-view - postcard sum-ups (essential info, click to expand, printout)


<!-- **Challenges** -->


<!-- **Code Snippets** -->


## Models
| Users    | Data Type & Constraints |
|----------|-------------------------|
| id       | PK |
| username | varchar(40) unique |
| hashword | varchar(255)       |

Characters
id
userId
name

CharaTraits
id
characterId
traitId

Generators
id
userId
title

TraitTypes
id
type

Traits
id
trait
typeId

TraitOdds
id
generatorId
traitId
odds

## Endpoints
| GET | `/` | Splash page/home page
| POST | `/signup`|
| POST | `/login` |
| POST | `/logout` |

categories - 5?
| GET | `/generator/start` |
`/generator/essentials`
`/generator/appearance`
`/generator/background`
`/generator/relations`
`/generator/abilities`
`/generator/personality`
`/generator/quest`

/users/:id
/users/:id/characters
/users/:id/characters/:charaId
/users/:id/generators

**Scribbling trait-option-field ideas**
ESSENTIALS
Name
gender
age
race
class/role/occupation
culture

APPEARANCE
hair
eyes
skin
build
clothing/styling
quirk


ABILITIES
power level
3-18 6 abilities
Descriptive words for each score.
talent, proficiency

PERSONALITY
disposition
mannerism
ideals
bonds
flaws
secrets

STORY
history
goal
weakness
useful knowledge
items/rewards


## Templates

Splash
login/signup
header navbar
footer

Generator Form
option buttons
category tabs - maker navbar
trait fields ->
  dropdown expansion
  display-list expansion
  odds chart/sliders expansion
skip, save draft, create

Profile -->
  character index
  settings index

Character Sheet
  data fill-in
  each category - module
  printable
  editable
  image upload

Custom settings
  editable
  + create new

Contact, About, Help/FAQ, etc.

## Wireframes
in my notebook

## Technology List
- React
- Redux
- Express
- Sequelize
- Postgres
- Sass
