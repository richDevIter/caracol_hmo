"use client"

import { useState, useRef } from "react"

type AccordionProps = {
  title: any
  children?: any
  style?: any,
  styleChildren?: any,
  startClosed?: boolean,
  classIcon?: any
}
const Accordion = ({ title, children, style, styleChildren, startClosed = false, classIcon = "" }: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(!startClosed)
  const [height, setHeight] = useState<string>(!startClosed ? "100%" : "0px")
  const contentElement = useRef(null)

  const HandleOpening = () => {
    setOpened(!isOpened)
    setHeight(!isOpened ? `100%` : "0px")
  }
  
  return (
    <div className={style}>
      <div onClick={HandleOpening} style={styleChildren} className={isOpened === false ? "bg-white flex justify-between" : `bg-white flex justify-between ${classIcon}`} >
        {title}
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className="overflow-hidden transition-all duration-200"
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
