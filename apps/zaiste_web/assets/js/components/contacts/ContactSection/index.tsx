/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import * as React from "react"
import { Contact } from "../interfaces"
import ActiveContact from './ActiveContact/ActiveContact'

interface Props {
  activeContact: Contact | null
}

const ContactSection: React.FC<Props> = ({ activeContact }) => (
  <div className="page-main">
    {
      activeContact ?
        <ActiveContact activeContact={activeContact} />
        : (
          <div id="background-icon">
            <i className="fas fa-address-book" />
          </div>
        )
    }
  </div>
)

export default ContactSection

var contacts = []
