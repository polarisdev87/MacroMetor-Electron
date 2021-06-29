import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../actions/actionHelpers'
import axios from 'axios'
// const backgroundLogoImg = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/a30861ce07b21d9fad9f30bdc35f9b48-4-1@1x.svg'
// const BackgroundImage = () => (<img className="a30861ce07b21d9-f30bdc35f9b48-4-1" src={backgroundLogoImg} />)
const nextUp = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/next-up@2x.svg'

const defaultImg = 'https://storage.googleapis.com/mm-notifications/stay_tuned.jpg'
const NextUp = () => {
  let interval = null
  const [whatImgSrc, setWhatImgSrc] = useState(defaultImg)
  useEffect(() => {
    interval = setInterval(async () => {
      const { data } = await axios.get(`${baseUrl}/nextUpLinks`)
      setWhatImgSrc(data.nextUpLink)
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [whatImgSrc])
  return (
    <>
      <a href="https://www.facebook.com/neace" target="_blank" rel="noreferrer">
      <div className="rectangle-16 border-1px-white-3">
      </div>
      <img className="next-up-info-img" src={whatImgSrc} />
      <div className="rectangle-22"> </div>
      {/* <BackgroundImage style={{ display: 'none' }} /> */}
      <img className="next-up" src={nextUp} />
      </a>
    </>
  )
}

export default NextUp
