import * as React from 'react'

const layout: React.FC = ({ children }) => (
  <main role="main" className="container">
    {children}
  </main>
)

export default layout
