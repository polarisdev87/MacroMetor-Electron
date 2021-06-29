/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import _ from 'lodash'
import React, { useState } from 'react'
import { Table, Space, Button } from 'antd'
import 'antd/dist/antd.css'
import './style.css'
import { connect } from 'react-redux'
import actions from '../actions/selectedMissions'
import { MainMissionIcon, SideMissionIcon } from '../MissionIcon'
import {
  CaretRightFilled
} from '@ant-design/icons'

import Modal from '../Modal'
import MissionHow from '../MissionHow'

const MissionModal = MissionHow

const mapStateToProps = (state) => {
  return {
    missions: state.missions.map(mission => ({ ...mission, key: mission.uuid })),
    mainMissionUUID: state.selectedMissions.mainMissionUUID,
    sideMissionUUID: state.selectedMissions.sideMissionUUID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMainMission: ({ uuid }) => dispatch(actions.setMainMission({ uuid })),
    setSideMission: ({ uuid }) => dispatch(actions.setSideMission({ uuid }))
  }
}

const Missions = connect(mapStateToProps, mapDispatchToProps)(_Missions)

function _Missions ({ missions, setMainMission, setSideMission, mainMissionUUID, sideMissionUUID }) {
  const [how, setHow] = useState(null)
  const [why, setWhy] = useState(null)
  const missionsSrc = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/missions@2x.svg'
  const columns = [
    {
      title: 'Mission',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div className='missions-row-text'>{text}</div>
      }
    },
    {
      dataIndex: 'whyVideoSrc',
      key: 'why',
      render: ({ why }, record) => <a className='' onClick={() => setWhy(record)}> Why? <CaretRightFilled /> </a>
    },
    {
      dataIndex: 'howVideoSrc',
      key: 'how',
      render: ({ how }, record) => <a className='' onClick={() => setHow(record)}> How? <CaretRightFilled /> </a>
    },
    {
      dataIndex: 'uuid',
      key: 'uuid',
      render: (uuid, record) => {
        const isMainMission = uuid === mainMissionUUID
        const isSideMission = uuid === sideMissionUUID
        return (
          <Space size="middle">
            <a key={record.uuid + 1} onClick={() => setMainMission({ uuid }) }>{isMainMission ? <MainMissionIcon /> : 'Main'}</a>
            <a key={record.uuid + 2}onClick={() => setSideMission({ uuid }) }>{isSideMission ? <SideMissionIcon /> : 'Side'}</a>
          </Space>
        )
      }
    }
  ]

  return (
    <>
      {<Modal title={`Scoring guide: ${_.get(how, 'name', '')}`} footer={[<Button key='ok' onClick={() => setHow(null)}>Ok</Button>]} closable={true} visible={!!how} onCancel={() => setHow(null)}><MissionModal videoSrc={_.get(how, 'howVideoSrc', '')} /></Modal>}
      {<Modal title={`Introduction: ${_.get(why, 'name', '')}`} footer={[<Button key='ok' onClick={() => setWhy(null)}>Ok</Button>]} closeable={true} visible={!!why} onCancel={() => setWhy(null)}><MissionModal videoSrc={_.get(why, 'whyVideoSrc', '')} /></Modal>}
      <div className="rectangle-13 border-1px-white-3"></div>
      <div className="rectangle-14"> </div>
      <img className="journal-entries" src={missionsSrc} />
      <div className="sizelarge-pagin-rue-toolbartrue">
        <div className="columns">
          <div className="overlap-group2 ">
            <Table dataSource={missions} columns={columns} pagination={{ pageSize: 7, position: 'bottom' }}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Missions
