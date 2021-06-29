/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Table, Button } from 'antd'
import MacroTag from './MacroTag'
import 'antd/dist/antd.css'
import './style.css'
import { connect } from 'react-redux'
import Modal from '../Modal'
import EntryReview from '../EntryReview'

const getTitle = ({ mainMissionScore, sideMissionScore, championName, roleName }) => {
  const avg = (mainMissionScore + sideMissionScore) / 2
  const baseString = ` ${roleName} ${championName} game`
  if (avg > 4) {
    return 'Great' + baseString
  }
  if (avg > 3) {
    return 'Solid' + baseString
  }
  if (avg > 2) {
    return 'Suboptimal' + baseString
  }
  if (avg > 0) {
    return 'A Wasted' + baseString
  }
  if (avg === 0) {
    return 'Autopiloted'
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries
  }
}

const Entries = connect(mapStateToProps, null)(_Entries)

function _Entries ({ entries }) {
  const [entry, setEntry] = useState(null)
  const journalEntries = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/journal-entries@2x.svg'
  const columns = [
    {
      title: 'Main Mission',
      dataIndex: 'mainMissionName',
      key: 'mainMissionName',
      render: text => <p className='missions-row-text' >{text}</p>
    },
    {
      dataIndex: 'mainMissionScore',
      key: 'mainMissionScore',
      render: text => <MacroTag score={Number(text)} />
    },
    {
      title: 'Side Mission',
      dataIndex: 'sideMissionName',
      key: 'sideMissionText',
      render: text => <p className='missions-row-text' >{text}</p>
    },
    {
      dataIndex: 'sideMissionScore',
      key: 'sideMissionScore',
      render: text => <MacroTag score={Number(text)} />
    },
    {
      dataIndex: 'uuid',
      key: 'uuid',
      render: (text, record) => <a className='' onClick={() => setEntry(record)}> Review </a>
    }

  ]
  const hide = () => setEntry(null)
  return (
    <>
      <Modal
        visible={!!entry}
        title={entry ? getTitle(entry) : ''}
        onCancel={hide}
        onOk={hide}
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={[
          <Button key="1">Delete</Button>,
          <Button key="2">Edit</Button>
        ]}
      >
        <EntryReview entryData={entry} />
      </Modal>
      <div className="rectangle-13 border-1px-white-3"></div>
      <div className="rectangle-14"> </div>
      <img className="journal-entries" src={journalEntries} />
      <div className="sizelarge-pagin-rue-toolbartrue">
        <div className="columns">
          <div className="overlap-group2">
            <Table dataSource={entries} columns={columns} pagination={{ pageSize: 7, position: 'bottom' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Entries
