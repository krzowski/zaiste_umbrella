import * as React from "react"
import AddButton from "../../shared/AddButton/AddButton"

interface Props {
}

// eslint-disable-next-line arrow-body-style
const ContactsMenu: React.FC<Props> = () => {
  return (
    <div className="page-menu">
      <AddButton buttonText="Add contact" handleOnClick={() => { }} />

      <div className="contacts-list mt40">
        <div className="contact-entry">
          <span className="initials">AB</span>
          Patryk Patrykowski
        </div>
        <div className="contact-entry">
          <span className="initials">GB</span>
          Grzegorz Grzegorzewski
        </div>
        <div className="contact-entry">
          <span className="initials">LO</span>
          Liam Olivia
        </div>
        <div className="contact-entry">
          <span className="initials">NE</span>
          Noah Emma
        </div>
        <div className="contact-entry">
          <span className="initials">OA</span>
          Oliver Ava
        </div>
        <div className="contact-entry">
          <span className="initials">EC</span>
          Elijah Charlotte
        </div>
        <div className="contact-entry">
          <span className="initials">WS</span>
          William Sophia
        </div>
      </div>
    </div>
  )
}

export default ContactsMenu
