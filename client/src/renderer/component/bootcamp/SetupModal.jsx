/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import defaultPaths from '../../../enum/game'
import playerConfig from '../../util/playerConfig'
import React from 'react'
import {
  Modal,
  Form,
  Button,
  Input,
  Select
} from 'antd'
import 'antd/dist/antd.css'
import './modal.css'
import actions from '../actions/appState'
import { connect } from 'react-redux'
import { isNull } from 'lodash'
import Checkbox from 'antd/lib/checkbox/Checkbox'

const { Option } = Select

const regions = ['na', 'eune', 'euw', 'lan', 'las', 'br', 'oce', 'ru', 'tr', 'jp', 'kr']

const modalColors = {
  alto: 'rgba(217, 217, 217, 0.45)',
  'eerie-black': 'rgba(32, 32, 32, 1)',
  rose: 'rgba(255, 77, 79, 1)',
  white: 'rgba(255, 255, 255, 0.25)',
  'white-2': 'rgba(255, 255, 255, 0.85)',
  'white-3': 'rgba(255, 255, 255, 0.35)',
  'neace-orange': 'rgba(242, 103, 53, 255)'
}

const handlePathValidation = (rules, path) => {
  const validPath = playerConfig.checkConfigPath(path)
  if (validPath) {
    return Promise.resolve(validPath)
  }
  return Promise.reject(validPath)
}
const SetupForm = ({ path, gameUserName, email, region, discord, form }) => {
  form.setFieldsValue({ path, gameUserName, email, discord, region })
  return (<Form
      form={form}
      name="log_in"
      initialValues={{
        path,
        gameUserName,
        email,
        region,
        discord
      }}
    >
    <Form.Item
      name='gameUserName'
      label={<p style={{ color: modalColors.alto, fontSize: '16px' }}>Summoner Name</p>}
      rules={[
        {
          required: true
        }
      ]}
    tooltip={'Once logged in the app only tracks for this summoner, double check it!'}
    >
      <Input size={'middle'} />
    </Form.Item>
    <Form.Item
      name='region'
      label={<p style={{ color: modalColors.alto, fontSize: '16px' }}>Region</p>}
      rules={[
        {
          required: true
        }
      ]}
      tooltip={'select the region associated with the summoner name above'}
      >
        <Select
          labelInValue
          style={{ width: 120, backgroundColor: modalColors['eerie-black'] }}
        >
          {regions.map(region => <Option key={region} value={region}> {region.toUpperCase()} </Option>)}
        </Select>
    </Form.Item>
    <Form.Item
      name='email'
      label={<p style={{ color: modalColors.alto, fontSize: '16px' }}>Email</p>}
      rules={[
        {
          required: true
        }
      ]}
      tooltip={'Email attached to stripe payment goes here'}
    >
      <Input size={'middle'} />
    </Form.Item>
    <Form.Item
      name='discord'
      tooltip={'this should have the #, example: hardstuck#1234'}
      label={<p style={{ color: modalColors.alto, fontSize: '16px' }}>Discord Name</p>}
      rules={[
        {
          required: true
        }
      ]}
    >
        <Input size={'middle'} />
    </Form.Item>
    <Form.Item
      name='code'
      tooltip={'your unique code that came in same email as the app goes here'}
      label={<p style={{ color: modalColors.alto, fontSize: '16px' }}>Code</p>}
      rules={[
        {
          required: true
        }
      ]}
      >
        <Input size={'middle'} />
    </Form.Item>
    <Form.Item
        name='path'
        tooltip={'Path to your League of Legends FOLDER'}
        label={<p style={{ color: modalColors.alto, fontSize: '16px' }}>Path</p>}
        hasFeedback
        rules={[
          { required: true, message: 'Make sure its pointing to the folder not the .exe, for help hit up discord' },
          { validator: handlePathValidation, message: 'This should be a path to folder you installed LoL to' },
          { trigger: 'onChange' },
          {}
        ]}
      >
        <Input size={'middle'} />
    </Form.Item>
      <Form.Item
        name='eula'
        // eslint-disable-next-line react/jsx-no-target-blank
        label={<p>I agree to all terms outlined in the discord eula </p>}
        valuePropName='checked'
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 4 }}
        rules={[
          { required: true, message: 'Agreement is required!' }
        ]}
      >
        <Checkbox style={{ color: modalColors.alto, fontSize: '16px', paddingLeft: '18px' }} />
    </Form.Item>
    </Form>)
}
const mapStateToProps = (state) => {
  const { token, email, gameUserName, discord, region, path } = state.appState

  return {
    token: token,
    email: email || '',
    gameUserName: gameUserName || '',
    region: region || '',
    path: path || defaultPaths.defaultGamePath,
    discord: discord || ''
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postAppState: ({ email, discord, gameUserName, region, code }) => dispatch(actions.postAppState({
      email,
      code,
      discord,
      gameUserName,
      region
    }))
  }
}
function _SetupModal ({ path, gameUserName, email, region, discord, token, postAppState }) {
  const [form] = Form.useForm()
  let showModal = false
  if (isNull(token)) {
    showModal = true
  }
  return <Modal
    className='macro-modal'
    visible={showModal}
    width={573}
    title={'Welcome, Sign in!'}
    bodyStyle={{ backgroundColor: modalColors['eerie-black'] }}
    style={{ top: 100, backgroundColor: modalColors['eerie-black'], paddingBottom: '0px' }}
    maskClosable={false}
    mask={true}
    closable={false}
    footer={[
    <Button
      key="submit"
      type="primary"
      htmlType="submit"
      style={{ margin: '10px', backgroundColor: modalColors['neace-orange'], border: 'none', color: modalColors['white-2'] }}
      onClick={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            postAppState({
              ...values,
              region: values.region.value,
              email: values.email.toLowerCase(),
              gameUserName: values.gameUserName.toLowerCase()

            })
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      Log In
    </Button>
    ]}
    >
      <SetupForm path={path} gameUserName={gameUserName} email={email} region={region} discord={discord} form={form} />
    </Modal>
}
const SetupModal = connect(mapStateToProps, mapDispatchToProps)(_SetupModal)
export default SetupModal
