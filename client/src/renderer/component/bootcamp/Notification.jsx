
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { notification } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
let lastText = null
const getText = (newText) => {
  if (newText !== lastText) {
    return newText
  }
  return null
}
function Notification () {
  useEffect(() => {
    const interval = setInterval(async () => {
      const text = await axios.get('https://pastebin.com/raw/giX5h8Dg')
      const showText = getText(text.data)
      if (!showText) {
        return
      }
      lastText = showText
      notification.open({
        description: showText,
        placement: 'bottomLeft',
        icon: <img src="https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/a30861ce07b21d9fad9f30bdc35f9b48-3@2x.svg"></img>
      })
    }, 3000)
    return () => clearInterval(interval)
  })
  return ''
}
export default Notification
