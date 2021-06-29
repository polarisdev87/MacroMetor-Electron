import React from 'react'
import './styles.css'
import cx from 'classnames'

const mainMissionIcon = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/a30861ce07b21d9fad9f30bdc35f9b48-3@2x.svg'
const sideMissionIcon = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/a30861ce07b21d9fad9f30bdc35f9b48-3@2x.svg'

export default function MissionIcon ({ className, src, label, size }) {
  return (
  <div className={cx('main-mission-icon', className, size)}>
    <img className='main-mission-icon-image' src={src} />
    <div className='main-mission-icon-descriptor'>{label}</div>
  </div>)
}

export function MainMissionIcon ({ className, size }) {
  return <MissionIcon src={mainMissionIcon} className={className} size={size} label={1} />
}

export function SideMissionIcon ({ className, size }) {
  return <MissionIcon src={sideMissionIcon} className={className} size={size} label={2} />
}
