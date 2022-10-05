import * as React from "react"
import { Link, NavLink } from "react-router-dom"
import { logo } from "./logo"
import { AuthContext } from "../contexts/AuthContext"
import { requestDeleteSession } from "../api_calls/session"

const Layout: React.FC = ({ children }) => {
  const { setAuthenticatedSession } = React.useContext(AuthContext)

  function handleSignOut() {
    requestDeleteSession().then(() => {
      setAuthenticatedSession(false) // Sign out regardless of server response.
    })
  }

  return (
    <>
      <div className="navigation-menu">
        <div className="nav">
          <div className="logo">
            <Link to="/overview">{logo}</Link>
          </div>

          <NavLink to="/overview">
            <i className="far fa-calendar" />
            <span className="nav-link-text">Overview</span>
          </NavLink>
          {/* <NavLink to="/projects">
            <i className="far fa-folder" />
            <span className="nav-link-text">Projects</span>
          </NavLink> */}

          <NavLink to="/nothing">
            <i className="fas fa-list-alt" />
            <span className="nav-link-text">Notes</span>
          </NavLink>

          <NavLink to="/patterns">
            <i className="fas fa-circle-notch" />
            <span className="nav-link-text">Patterns</span>
          </NavLink>

          {/* <div className="menu-divider"></div> */}

          {/* <NavLink to="/nothing">
            <i className="fas fa-book"></i>
            <span className="nav-link-text">Thoughts</span>
          </NavLink> */}

          <NavLink to="/contacts">
            <i className="fas fa-address-book" />
            <span className="nav-link-text">Contacts</span>
          </NavLink>
          <NavLink to="/wallet">
            <i className="fas fa-wallet" />
            <span className="nav-link-text">Wallet</span>
          </NavLink>
        </div>

        <div className="operations">
          <div className="menu-divider" />
          {/* <NavLink to="/nothing">
            <i className="fas fa-cog"></i>
          </NavLink>
          <span className="nav-link-text">Settings</span> */}
          <a className="logout" role="button" onClick={handleSignOut}>
            <i className="fas fa-power-off" />
            <span className="nav-link-text">Sign out</span>
          </a>
        </div>
      </div>

      <div className="container">{children}</div>
    </>
  )
}

export default Layout
