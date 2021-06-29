import React from 'react'
import { Modal } from 'antd'
import './styles.css'

export default function MacroModal (props) {
  return (
    <Modal
      destroyOnClose={true}
      className='macro-modal-container'
      {...props}
    />
  )
}
