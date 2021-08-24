import * as React from 'react'
import { logo } from './logo'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { deleteSession } from '../api_calls/session'


const Layout: React.FC = ({ children }) => {
  const { setAuthenticatedSession } = React.useContext(AuthContext)

  function handleSignOut() {
    deleteSession().then(() => {
      setAuthenticatedSession(false) // Sign out regardless of server response.
    })
  }

  return (
    <>
      <div className="navigation-menu">
        <div className="nav">
          <div className="logo">
            <Link to="/overview">
              {logo}
            </Link>
          </div>

          <NavLink to="/overview">
            <i className="far fa-calendar"></i>
            <span className="nav-link-text">Overview</span>
          </NavLink>
          <NavLink to="/projects">
            <i className="far fa-folder"></i>
            <span className="nav-link-text">Projects</span>
          </NavLink>

          <NavLink to="/patterns">
            <i className="fas fa-circle-notch"></i>
            <span className="nav-link-text">Patterns</span>
          </NavLink>

          {/* <div className="menu-divider"></div> */}

          <NavLink to="/nothing">
            <i className="fas fa-list-alt"></i>
            <span className="nav-link-text">Topic cards</span>
          </NavLink>
          {/* <NavLink to="/nothing">
            <i className="fas fa-book"></i>
            <span className="nav-link-text">Thoughts</span>
          </NavLink> */}

          <div className="menu-divider"></div>

          <NavLink to="/nothing">
            <i className="fas fa-address-book"></i>
            <span className="nav-link-text">Contacts</span>
          </NavLink>
          <NavLink to="/wallet">
            <i className="fas fa-wallet"></i>
            <span className="nav-link-text">Wallet</span>
          </NavLink>


        </div>

        <div className="operations">
          <div className="menu-divider"></div>
          {/* <NavLink to="/nothing">
            <i className="fas fa-cog"></i>
          </NavLink>
          <span className="nav-link-text">Settings</span>*/}
          <a className="logout" onClick={handleSignOut}>
            <i className="fas fa-power-off"></i>
            <span className="nav-link-text">Sign out</span>
          </a>
        </div>
      </div>

      <div className="container">
        {children}
      </div>
    </>
  )
}

export default Layout
