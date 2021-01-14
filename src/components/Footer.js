import { NavLink} from 'react-router-dom'

// MY COMPONENTS

// ACTIONS


// *****************************************************************************

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li><NavLink to="#top">Top</NavLink></li>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/generator">Make NPC</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/faq"><abbr title="Frequently Asked Questions">F.A.Q.</abbr></NavLink></li>
        </ul>
      </nav>
    </footer>
  )
}