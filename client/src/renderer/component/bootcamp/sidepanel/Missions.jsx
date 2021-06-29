/* eslint-disable react/prop-types */
import React from 'react'
import actions from '../../actions/appState'
import { connect } from 'react-redux'
import { MainMissionIcon, SideMissionIcon } from '../../MissionIcon'

const line2 = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/line-2@2x.svg'
const missions = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/missions@2x.svg'

const missionNameByUUID = (uuid, missions) => {
  return missions.find(mission => mission.uuid === uuid).name
}
const mapStateToProps = (state) => {
  let mainMissionText, sideMissionText
  const missions = state.missions
  const { mainMissionUUID, sideMissionUUID } = state.selectedMissions
  if (missions.length > 0) {
    mainMissionText = missionNameByUUID(mainMissionUUID, missions)
    sideMissionText = missionNameByUUID(sideMissionUUID, missions)
  }
  return {
    mainMissionText: mainMissionText || 'Loading!',
    sideMissionText: sideMissionText || 'Loading!'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePageSelect: dispatch(actions.setAppState({ page: 'missions' }))
  }
}

const _Missions = ({ mainMissionText, sideMissionText }) => {
  return (
    <div>
      <div className="rectangle-15 border-1px-white-3"></div>
      <div className="rectangle-19"></div>
      <img className="missions" src={missions} />
        <MainMissionIcon className='a30861ce07b21d9-f30bdc35f9b48-3' size='large' />
        <div className="main-mission roboto-normal-white-14px">Main Mission</div>
      <div className="text-6 roboto-normal-white-14px-2"> {mainMissionText}</div>
      <img className="line-2" src={line2} />
      <SideMissionIcon className='a30861ce07b21d9-f30bdc35f9b48-4' size='large' />
      <div className="side-mission roboto-normal-white-14px">Side Mission</div>
      <div className="vision-control roboto-normal-white-14px-2">{sideMissionText}</div>
    </div>
  )
}
const Missions = connect(mapStateToProps, mapDispatchToProps)(_Missions)
export default Missions
