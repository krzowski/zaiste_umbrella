import * as React from 'react'


interface ModalProps {
  modalWidth: number
  modalHeight: number
  initialTopPosition: number
  initialLeftPosition: number
  modalId: string
  modalTitle: string
  closeModal: Function
  children: JSX.Element
}


const ModalCard: React.FC<ModalProps> = ({
  modalWidth, modalHeight, initialTopPosition, initialLeftPosition,
  modalId, modalTitle, closeModal, children
}) => {
  const [maximized, setMaximized] = React.useState<boolean>(false)
  const [coords, setCoords] = React.useState<object>({
    top: initialTopPosition + "px",
    left: initialLeftPosition + "px"
  })

  React.useEffect(() => {
    dragElement(document.getElementById(modalId))
    elevateModal(modalId)
  }, [])

  let modalStyle
  if (maximized) {
    modalStyle = {
      width: window.innerWidth + "px",
      height: window.innerHeight + "px",
      top: "0px",
      left: "0px",
    }
  } else {
    modalStyle = {
      width: modalWidth + "px",
      height: modalHeight + "px",
      ...coords
    }
  }


  return (
    <div
      id={modalId}
      className="modalcard"
      onMouseDown={() => elevateModal(modalId)}
      style={modalStyle}
    >
      <div className="top-panel flex-row-justify">
        <div className="modal-title pl8">{modalTitle}</div>
        <div className="modal-actions flex-row-justify">
          <div className="maximize-modalcard" onClick={() => setMaximized(!maximized)}>&#9645;</div>
          <div className="close-modalcard" onClick={() => closeModal(modalId)}>x</div>
        </div>
      </div>
      <div className="body">
        {children}
      </div>
    </div>
  )

  // Code below taken from https://www.w3schools.com/howto/howto_js_draggable.asp
  function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    let styleTop, styleLeft
    const dragBar = elmnt.querySelector('.top-panel')
    dragBar.onmousedown = dragMouseDown

    function dragMouseDown(e) {
      e = e || window.event
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
    }

    function elementDrag(e) {
      e = e || window.event
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      styleTop = (elmnt.offsetTop - pos2) + "px"
      styleLeft = (elmnt.offsetLeft - pos1) + "px"
      // set the element's new position:
      elmnt.style.top = styleTop
      elmnt.style.left = styleLeft
    }

    function closeDragElement(e) {
      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null

      setCoords({
        top: styleTop,
        left: styleLeft
      })
    }
  }
}

function elevateModal(modalId) {
  const INITIAL_Z_INDEX = 1001
  const currentTopZIndex = parseInt(localStorage.getItem('currentTopZIndex'))
  const newTopZIndex = (currentTopZIndex ? currentTopZIndex + 1 : INITIAL_Z_INDEX).toString()

  document.getElementById(modalId).style.zIndex = newTopZIndex
  localStorage.setItem('currentTopZIndex', newTopZIndex)
}

export default ModalCard
