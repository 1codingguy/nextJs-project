'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'

import styles from './Modal.module.css'

type ModalProps = {
  show: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

const Modal = ({ show, onClose, children, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => setIsBrowser(true), [])

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    onClose()
  }

  const ModalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a onClick={e => handleClose(e)}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return createPortal(ModalContent, document.getElementById('modal-root')!)
  } else {
    return null
  }
}

export default Modal
