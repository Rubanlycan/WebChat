import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { JsxElement } from 'typescript'

type Props = {
    children:React.ReactNode
}

const Modal = ({children}: Props) => {
    const ref = useRef<Element | null>(null)
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
      ref.current = document.querySelector<HTMLElement>("#myportal")
      setMounted(true)
    }, [])
  
  return (
    (mounted && ref.current) ? createPortal(<div className='overlay'>{children}</div>, ref.current) : null
  )
}

export default Modal