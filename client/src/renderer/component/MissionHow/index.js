import React from 'react'
import './styles.css'

export default function MissionHow ({ videoSrc }) {
  console.log({ videoSrc })
  return (
    <>
    <video width="474" height="240" controls autoPlay controlsList="nodownload">
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    </>
  )
}
