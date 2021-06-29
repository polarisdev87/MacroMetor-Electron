
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import {
  Form,
  Switch
} from 'antd'
import {
  ArrowLeftOutlined
} from '@ant-design/icons'
import actions from './action_local_data'
import { SettingsDeepDiveStatic } from './constant'
const REGISTERED_TRACKER_IDS = Object.keys(SettingsDeepDiveStatic)
const getTrackerStatusFromState = (trackerId, { customer }) => {
  const defaultStatus = {
    trackerId,
    status: 0
  }
  if (!customer || !customer.local || !customer.local[trackerId]) {
    return defaultStatus
  }
  return {
    ...defaultStatus,
    status: customer.local[trackerId]
  }
}
const getSwitch = (name, props) => {
  const onChange = () => props.toggleTrackerStatus(name)
  const isOn = getTrackerStatusFromState(name, props).status
  if (isOn) {
    return (<Form.Item key={name} label={`${name} Tracker`} name={name}>
<Switch checkedChildren='on' unCheckedChildren='off' defaultChecked onChange={onChange} />
</Form.Item>)
  } else {
    return (<Form.Item key={name} label={`${name} Tracker`} name={name}>
    <Switch checkedChildren='on' unCheckedChildren='off' onChange={onChange}/>
    </Form.Item>)
  }
}
const _Tracking = (props) => {
  const trackerIds = REGISTERED_TRACKER_IDS
  return (
    <div style={{ justifyContent: 'flex-end' }}>
      <Form
        layout="vertical"
      >
        {trackerIds.map(id => getSwitch(id, props))}
      </Form>

    </div>
  )
}

class Tracking extends Component {
  render () {
    return <div>
      <Link to={'/customer/setting'}><ArrowLeftOutlined /> Back</Link>
      <br />
      <br />
      <_Tracking {...this.props} />
    </div>
  }
}
const mapStateToProps = state => {
  return {
    customer: state.customer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTrackerStatus: (id) => {
      return dispatch(actions.toggleTracker(id))
    },
    incrementPI: (o) => {
      return dispatch(actions.incrementProgress(o))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tracking))
