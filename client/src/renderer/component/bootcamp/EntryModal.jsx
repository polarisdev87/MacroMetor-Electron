/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import _ from 'lodash'
import React from 'react'
import {
  Modal,
  Form,
  Button,
  Input,
  Rate,
  Select
} from 'antd'
import {
  CloseOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css'
import './modal.css'
import entriesActions from '../actions/entries'
import appStateActions from '../actions/appState'

import { connect } from 'react-redux'
import Checkbox from 'antd/lib/checkbox/Checkbox'

const { Option } = Select

const modalColors = {
  alto: 'rgba(217, 217, 217, 0.45)',
  'eerie-black': 'rgba(32, 32, 32, 1)',
  rose: 'rgba(255, 77, 79, 1)',
  white: 'rgba(255, 255, 255, 0.25)',
  'white-2': 'rgba(255, 255, 255, 0.85)',
  'white-3': 'rgba(255, 255, 255, 0.35)',
  'neace-orange': 'rgba(242, 103, 53, 255)'
}

const mapStateToProps = (state) => {
  const { token, region, currentGameData, violations } = state.appState

  return {
    ...formatMissions({ selectedMissions: state.selectedMissions, allMissions: state.missions }),
    userToken: token,
    game: currentGameData,
    region
  }
}

const MacroRate = ({ name, labelText, message, ratingTips }) => {
  return (
    <Form.Item
      name={name}
      label={<p style={{ color: modalColors['white-2'], paddingRight: '200px', paddingLeft: '0' }}>{labelText} </p>}
      labelCol={{ span: 17 }}
      wrapperCol={{ span: 8 }}
      hasFeedback
      rules={[{ required: true, message }]}
    >
      <Rate tooltips={ratingTips} allowHalf={true} allowClear={true} showCount style={{ color: modalColors['neace-orange'] }}/>
    </Form.Item>
  )
}
const MacroTextArea = ({ name, labelText, message, placeholderText }) => {
  return (
    <Form.Item
    name={name}
    label={<p style={{ color: modalColors.alto, fontSize: '16px', paddingLeft: '18px' }}> {labelText} </p>}
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    rules={[{ message }]}
    >
    <Input.TextArea size='small' placeholder={placeholderText} />
  </Form.Item>
  )
}
const EntryForm = ({ mainMissionName, sideMissionName, form, victoryFlag, mainMissionRatings, sideMissionRatings }) => {
  form.setFieldsValue({ victoryFlag })
  return (<Form
      form={form}
      name="journal_entry"
      initialValues={{
        mainMissionScore: 2.5,
        sideMissionScore: 2.5,
        diaryText: ' ',
        rankedGameFlag: true,
        mainMissionText: ' ',
        sideMissionText: ' ',
        roleName: { value: 'top' },
        victoryFlag
      }}
    >
      <Form.Item
        name='rankedGameFlag'
        label='Ranked'
        valuePropName='checked'
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 4 }}
      >
        <Checkbox style={{ color: modalColors.alto, fontSize: '16px', paddingLeft: '18px' }} />
      </Form.Item>
      <Form.Item
        name='victoryFlag'
        label='Victory'
        valuePropName='checked'
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 4 }}
      >
        <Checkbox style={{ color: modalColors.alto, fontSize: '16px', paddingLeft: '18px' }} />
      </Form.Item>
      <Form.Item name='roleName'>
        <Select
          labelInValue
          style={{ width: 120 }}
        >
          <Option value="top">Top</Option>
          <Option value="jungle">Jungle</Option>
          <Option value="middle">Middle</Option>
          <Option value="bottom">Bottom</Option>
          <Option value="support">Support</Option>
        </Select>
      </Form.Item>
      <MacroRate
        name={'mainMissionScore'}
        labelText={'Rate yourself on your main mission'}
        message={'Please rate yourself on your main mission!'}
        ratingTips={mainMissionRatings}
      />
      <MacroTextArea
       name={'mainMissionText'}
       labelText={mainMissionName}
       message={'Main mission notes?'}
       />
      <MacroRate
        name={'sideMissionScore'}
        labelText={'Rate yourself on your side mission'}
        message={'Please rate yourself on your side mission!'}
        ratingTips={sideMissionRatings}
      />
      <MacroTextArea
        name={'sideMissionText'}
        labelText={sideMissionName}
        message={'Side mission notes?'}
      />
      <Form.Item
        name='diaryText'
        label={<p style={{ color: modalColors.alto, fontSize: '16px', paddingLeft: '18px' }}>Key takeaways from the game?</p>}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ message: 'What did you takeaway from this game?' }]}
        >
        <Input.TextArea />
      </Form.Item>
    </Form>)
}
const missionByUUID = (uuid, missions) => {
  return missions.find(mission => mission.uuid === uuid) || null
}
const formatMissions = ({ selectedMissions, allMissions }) => {
  const { mainMissionUUID, sideMissionUUID } = selectedMissions
  const mainMission = missionByUUID(mainMissionUUID, allMissions)
  const sideMission = missionByUUID(sideMissionUUID, allMissions)
  return {
    mainMission,
    sideMission
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    postEntry: (obj) => dispatch(entriesActions.postEntries({ ...obj })),
    hideModal: () => dispatch(appStateActions.setAppState({ showEntryForm: false }))
  }
}
function _EntryModal ({ visible, hideModal, mainMission, sideMission, userToken, game, region, postEntry }) {
  const [form] = Form.useForm()
  let shouldShow = visible
  if (!userToken) {
    shouldShow = false
  }
  if (_.get(mainMission, 'mainMissionUUID', null)) {
    shouldShow = false
  }
  return <Modal
    className='macro-modal'
    visible={shouldShow}
    width={573}
    title={'Game Debrief'}
    bodyStyle={{ backgroundColor: modalColors['eerie-black'] }}
    style={{ top: 100, backgroundColor: modalColors['eerie-black'], paddingBottom: '0px' }}
    maskClosable={false}
    mask={true}
    onCancel={() => {
      hideModal()
    }}
    closeIcon={<CloseOutlined style={{ color: 'red' }} />}
    cancelText={'Skip'}
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
            const mergedDataValues = Object.assign(
              {},
              {
                enteredValues: {
                  ...values,
                  roleName: _.get(values, 'roleName.value', 'top'),
                  mainMissionName: mainMission.name,
                  sideMissionName: sideMission.name,
                  mainMissionUUID: mainMission.uuid,
                  sideMissionUUID: sideMission.uuid,
                  victoryFlag: game.victoryFlag ? game.victoryFlag : values.victoryFlag
                }
              },
              { game },
              { userToken },
              { region }
            )
            postEntry(mergedDataValues)
            hideModal()
          })
          .catch((info) => {
            console.error('Validate Failed:', info)
          })
      }}
    >
      Submit
    </Button>
    ]}
    >
      <EntryForm
        form={form}
        mainMissionName={_.get(mainMission, 'name', 'NONE')}
        sideMissionName={_.get(sideMission, 'name', 'NONE')}
        mainMissionRatings={_.get(mainMission, 'ratingTips', [])}
        sideMissionRatings={_.get(sideMission, 'ratingTips', [])}
      />
    </Modal>
}
const EntryModal = connect(mapStateToProps, mapDispatchToProps)(_EntryModal)
export default EntryModal
