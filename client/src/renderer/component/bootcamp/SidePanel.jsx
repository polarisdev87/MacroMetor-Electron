/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import 'antd/dist/antd.css'
import './style.css'
import Missions from './sidepanel/Missions'
import Overview from './sidepanel/Overview'
import Status from './sidepanel/Status'
import NextUp from './sidepanel/NextUp'
import ReportBar from './sidepanel/ReportBar'

function SidePanel ({ gamesPlayedNumber, climbingStatus, mainMissionText, sideMissionText, learningStatus }) {
  return (
    <>
      <Overview gamesPlayedNumber={gamesPlayedNumber} />
      <Missions mainMissionText={mainMissionText} sideMissionText={sideMissionText} />
      <Status climbingStatus={climbingStatus} learningStatus={learningStatus} />
      <NextUp />
      <ReportBar />
    </>
  )
}

export default SidePanel
