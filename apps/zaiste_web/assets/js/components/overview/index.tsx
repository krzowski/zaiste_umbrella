import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import OverviewMenu from "./menu"

function resolveMainComponent(pathname: String) {
  if (pathname === "/projects") {
    return <div>Projects</div>
  } else if (pathname === "/patterns") {
    return <div>Patterns</div>
  } else {
    return <div>Overview</div>
  }
}

const Overview: React.FC<RouteComponentProps> = ({ location }) => {
  const [MainComponent, setMainComponent] = React.useState<JSX.Element | null>(null)

  React.useEffect(() => {
    setMainComponent(resolveMainComponent(location.pathname))
  }, [location.pathname])

  return (
    <div className="overview-container">
      <div className="overview-component">{MainComponent}</div>
      <div className="events-calendar-container">
        <OverviewMenu />
      </div>
    </div>
  )
}

export default Overview
