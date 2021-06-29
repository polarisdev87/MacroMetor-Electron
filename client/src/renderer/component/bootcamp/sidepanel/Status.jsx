/* eslint-disable react/prop-types */
import { Tooltip } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import './status.css'

const status = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/status@2x.svg'
const mapStateToProps = (state) => {
  const lastEntry = state.entries[0]
  const computedLearningStatus = (lastEntry) ? lastEntry.mainMissionScore + lastEntry.sideMissionScore > 5 : 0
  return {
    learningStatus: computedLearningStatus,
    gameUserName: state.appState.gameUserName
  }
}
const _Status = ({ learningStatus, gameUserName }) => {
  return (
    <>
      <div className="rectangle-20 border-1px-white-3"></div>
      <div className="rectangle-21"></div>
      <Tooltip title={`IGN:${gameUserName}`}>
        <img className="status" src={status} />
      </Tooltip>
      {(learningStatus + 1) ? <div className="not-learning stamp is-approved">Learning!</div> : <div className="not-learning stamp is-nope">Not Learning</div>}
    </>
  )
}

const Status = connect(mapStateToProps)(_Status)

export default Status
