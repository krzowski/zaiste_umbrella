/* eslint-disable vars-on-top */
import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import ContactsMenu from "./menu"
import ContactSection from "./ContactSection"
import { Contact } from "./interfaces"

const Contacts: React.FC<RouteComponentProps> = () => {
  const [activeContact, setActiveContact] = React.useState<Contact>(null)

  return (
    <div className="page-container contacts-container">
      <ContactSection activeContact={contact} />
      <ContactsMenu />
    </div>
  )
}

export default Contacts

// eslint-disable-next-line vars-on-top
// eslint-disable-next-line no-var
var contact = {
  id: 2,
  name: "Partyk Patrykowski",
  dateOfBirth: "1990-08-08",
  notes: "textcome",
}
