import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
      alt="web logo"
      className="web-logo-head"
    />
    <div>
      <FaMoon className="header-icons" />
      <GiHamburgerMenu className="header-icons" />
      <FiLogOut className="header-icons" />
    </div>
  </nav>
)

export default Header
