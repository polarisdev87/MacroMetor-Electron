/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Modal } from 'antd'
import 'antd/dist/antd.css'
import './style.css'
import EntryModal from './EntryModal'
import SetupModal from './SetupModal'
import SidePanel from './SidePanel'
import Missions from './Missions'
import SideNav from './SideNav'
import Notification from './Notification'
import { connect } from 'react-redux'
import Entries from './Entries'
import { triggerEmitter } from '../../util/trackers'
import actions from '../actions/appState'

const BackgroundSpacing = () => (
  <>
<div className="rectangle">
  </div>
  <div className="rectangle-1">
  </div>
  </>
)

const mapStateToProps = (state) => {
  return {
    page: state.appState.page,
    showEntryForm: state.appState.showEntryForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(actions.setAppState({ showEntryForm: true }))
  }
}

const Main = ({ page }) => {
  if (page === 'entries') {
    return <Entries />
  }
  if (page === 'missions') {
    return <Missions/>
  }
  // TODO replace with error throw
  return 'MAIN RETURNED NOTHING'
}

function _App ({ page, showModal, showEntryForm }) {
  return (
    <div className="combined-screens">
      <EntryModal visible={showEntryForm}/>
      <SetupModal />
      <SideNav page={page} />
      <div className="overlap-group">
        <BackgroundSpacing />
        <Main page={page} />
        <SidePanel
          nextVideoUrl={''}
          nextVideoTimer={'10:31:11'}
        />
        <Notification />
      </div>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(_App)
