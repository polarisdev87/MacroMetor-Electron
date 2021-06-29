/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Table, Tag, Space, Button, notification, Modal } from 'antd'
import {
  UnorderedListOutlined,
  HomeFilled,
  FolderOpenFilled
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import './style.css'
import entryActions from '../actions/entries'
import missionActions from '../actions/missions'
import appStateActions from '../actions/appState'
import { connect } from 'react-redux'

const mainPic = 'https://storage.googleapis.com/macromentor.appspot.com/macromentor%20icon%20256x256.png'

const mapDispatchToProps = (dispatch) => {
  return {
    getEntries: ({ userToken }) => dispatch(entryActions.getEntries({ userToken })),
    getMissions: ({ userToken }) => dispatch(missionActions.getMissions({ userToken })),
    selectPage: (page) => dispatch(appStateActions.setAppState({ page }))
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.appState.token,
    page: state.appState.page
  }
}

const _SideNav = ({ page, getEntries, selectPage, getMissions, userToken }) => {
  return (
    <div className="overlap-group1">
      {/* <HomeFilled className="iconsetting" style={{ fontSize: '2em', color: 'red' }} /> */}
      <img className="iconsetting drag" src={mainPic} />
      <FolderOpenFilled className="iconsetting" style={{ fontSize: '2em', color: getIconColor(page, 'missions') }} onClick={() => {
        selectPage('missions')
        getEntries({ userToken })
      }} />
      <UnorderedListOutlined className="iconsetting" style={{ fontSize: '2em', color: getIconColor(page, 'entries') }} onClick={() => {
        selectPage('entries')
        getMissions({ userToken })
      }} />
    </div>
  )
}
const SideNav = connect(mapStateToProps, mapDispatchToProps)(_SideNav)

const getIconColor = (currentSelection, pageString) => {
  const activeColor = '#ffff'
  const inactiveColor = 'rgba(242,103,53,255)'
  if (!currentSelection && pageString === 'home') {
    return activeColor
  }
  return currentSelection === pageString ? activeColor : inactiveColor
}

export default SideNav
