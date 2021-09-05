/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react"

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
  modalWidth,
  modalHeight,
  initialTopPosition,
  initialLeftPosition,
  modalId,
  modalTitle,
  closeModal,
  children,
}) => {
  const [maximized, setMaximized] = React.useState<boolean>(false)
  const [coords, setCoords] = React.useState<object>({
    top: `${initialTopPosition}px`,
    left: `${initialLeftPosition}px`,
  })
  const modalCardContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    dragElement(modalCardContainerRef.current!)
    elevateModal(modalId)
  }, [])

  let modalStyle
  if (maximized) {
    modalStyle = {
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`,
      top: "0px",
      left: "0px",
    }
  } else {
    // Cap modal size at window size.
    // eslint-disable-next-line max-len
    const width =
      modalWidth < window.innerWidth - initialLeftPosition
        ? modalWidth
        : window.innerWidth - initialLeftPosition
    // eslint-disable-next-line max-len
    const height =
      modalHeight < window.innerHeight - initialTopPosition
        ? modalHeight
        : window.innerHeight - initialTopPosition

    modalStyle = {
      width: `${width}px`,
      height: `${height}px`,
      ...coords,
    }
  }

  return (
    <div
      role="tab"
      tabIndex={0}
      id={modalId}
      className="modalcard"
      onMouseDown={() => elevateModal(modalId)}
      style={modalStyle}
      ref={modalCardContainerRef}
    >
      <div className="top-panel flex-row-justify">
        <div className="modal-title pl8">{modalTitle}</div>
        <div className="modal-actions flex-row-justify">
          <div
            role="button"
            className="maximize-modalcard"
            onClick={() => setMaximized(!maximized)}
          >
            &#9645;
          </div>

          <div role="button" className="close-modalcard" onClick={() => closeModal()}>
            x
          </div>
        </div>
      </div>
      <div className="body custom-scrollbar">{children}</div>
    </div>
  )

  // dragElement taken from https://www.w3schools.com/howto/howto_js_draggable.asp
  function dragElement(elmnt: HTMLDivElement) {
    // keep last used styles for maximization/minimization
    let styleTop: string
    let styleLeft: string

    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0

    const dragBar: HTMLElement = elmnt.querySelector(".top-panel")!
    dragBar.onmousedown = dragMouseDown

    function dragMouseDown(e: MouseEvent) {
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
    }

    function elementDrag(e: MouseEvent) {
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // eslint-disable-next-line prefer-template
      styleTop = elmnt.offsetTop - pos2 + "px"
      // eslint-disable-next-line prefer-template
      styleLeft = elmnt.offsetLeft - pos1 + "px"

      // set the element's new position:
      // eslint-disable-next-line no-param-reassign
      elmnt.style.top = styleTop
      // eslint-disable-next-line no-param-reassign
      elmnt.style.left = styleLeft
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null

      // eslint-disable-next-line no-unused-expressions
      styleTop &&
        setCoords({
          top: styleTop,
          left: styleLeft,
        })
    }
  }
}

function elevateModal(modalId: string) {
  const INITIAL_Z_INDEX = "1001"
  const currentTopZIndex: number = parseInt(
    localStorage.getItem("currentTopZIndex") || INITIAL_Z_INDEX
  )
  const newTopZIndex = (currentTopZIndex + 1).toString()

  document.getElementById(modalId)!.style.zIndex = newTopZIndex
  localStorage.setItem("currentTopZIndex", newTopZIndex)
}

export default ModalCard
