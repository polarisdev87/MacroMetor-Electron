/* eslint-disable react/prop-types */
import React, { Component, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import config from '../../util/playerConfig'
import { GET2 } from '../../util/request'
import constants from '../../../enum/game'

import {
  Form,
  Input,
  Button,
  Row
} from 'antd'
import actions from './action_local_data'
import ReactPlayer from 'react-player'
import Modal from 'antd/lib/modal/Modal'

const _Setting = ({ path, summonerName, email, verifyUserData }) => {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  form.setFieldsValue({ path, summonerName, email })
  const isVerified = path && summonerName && email
  return (
    <div>
      <Form form={form}
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 14
        }}
        layout="horizontal"
        initialValues={{ path: path, summonerName: summonerName, email: email }}
      >
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          validateStatus={email ? 'success' : 'error'}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Summoner"
          name="summonerName"
          hasFeedback
          validateStatus={summonerName ? 'success' : 'error'}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Game Path"
          name="path"
          hasFeedback
          validateStatus={path ? 'success' : 'error'}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ justifyContent: 'flex-end' }}>
          <Button onClick={() => {
            verifyUserData(form.getFieldValue())
          } }>Verify</Button>
          {isVerified ? <Link to='/game/settings' > Start here! </Link> : ''}
          </Form.Item>
        <Form.Item hidden label='console'>
          <Input onChange={(e, v) => {
            ipcRenderer.send('RECV', e.target.value)
          }}/>
        </Form.Item>
      </Form>
      <Row span={18} style={{ justifyContent: 'flex-end' }}>
        <Link to={'/customer/tracking'}> Tracking Settings </Link>
      </Row>
      <a onClick={showModal}>
          A message from our hero
      <Modal width={700} visible={isModalVisible} onOk={(e) => { e.stopPropagation(); handleOk() }} cancelButtonProps={{ style: { display: 'none' } }}>
          <ReactPlayer url='https://www.youtube.com/watch?v=euJUwYIBt70' />
        </Modal>
        </a>
    </div>
  )
}

class Setting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: this.props.email,
      summonerName: this.props.summonerName,
      path: this.props.path
    }
  }

  async verifyUserData ({ email, path, summonerName }) {
    const validPath = config.checkConfigPath(path)
    const res = await GET2(`https://www.macromentor.gg/api/verify?email=${email}&summonerName=${summonerName}`)
    this.setState({
      email: res.valid ? email : null,
      summonerName: res.valid ? summonerName : null,
      path: validPath ? path : null
    })
    if (res.valid) {
      this.props.updateUser({ email, summonerName })
    }
    if (validPath) {
      this.props.updatePath({ path })
    }
  }

  async componentDidMount () {
    const email = this.state.email
    const summonerName = this.state.summonerName
    const path = this.state.path || constants.defaultGamePath
    this.verifyUserData({ email, summonerName, path })
  }

  render () {
    return <div>
      <_Setting email={this.state.email} summonerName={this.state.summonerName} path={this.state.path} verifyUserData={this.verifyUserData.bind(this)} />
    </div>
  }
}
const mapStateToProps = state => {
  const path = state.customer.local.path
  const email = state.customer.local.email
  const summonerName = state.customer.local.summonerName
  return {
    path,
    email,
    summonerName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: ({ email, summonerName }) => {
      dispatch(actions.updateUser({ email, summonerName }))
    },
    updatePath: ({ path }) => {
      dispatch(actions.updatePath({ path }))
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Setting))
