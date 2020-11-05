import * as React from 'react'
import { logo } from './logo'
import { Link } from 'react-router-dom'


const Layout: React.FC = ({ children }) => (
  <>
    <div className="top-header">
      <Link to="/calendar">
        {logo}
      </Link>
    </div>

    <div className="right-pane">
      <div className="nav">
        <Link to="/calendar">
          <i className="fas fa-calendar"></i>
        </Link>
        <Link to="">
          <i className="fas fa-folder"></i>
        </Link>
        <Link to="">
          <i className="fas fa-brain"></i>
        </Link>

        <div className="menu-divider"></div>

        <Link to="">
          <i className="fas fa-comments"></i>
        </Link>
        <Link to="">
          <i className="fas fa-language"></i>
        </Link>
        <Link to="">
          <i className="fas fa-pen"></i>
        </Link>

        <div className="menu-divider"></div>

        <Link to="/wallet">
          <i className="fas fa-wallet"></i>
        </Link>
        <Link to="">
          <i className="fas fa-book"></i>
        </Link>
      </div>

      <div className="operations">
        <div className="menu-divider"></div>
        <Link to="">
          <i className="fas fa-cog"></i>
        </Link>
        <Link to="">
          <i className="fas fa-power-off"></i>
        </Link>
      </div>
    </div>

    <div className="container">
      {children}
    </div>
  </>
)

export default Layout
