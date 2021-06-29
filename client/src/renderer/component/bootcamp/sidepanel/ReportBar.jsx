/* eslint-disable react/prop-types */
import React from 'react'

import {
  QuestionCircleOutlined
} from '@ant-design/icons'
import { Tooltip } from 'antd'

const ReportBar = ({ helpClickHandler, feedbackClickHandler }) => {
  return (
    <>
    <Tooltip title={'Go to the discord for help and feedback!'}>
      <QuestionCircleOutlined className='icon-usergroup-add' style={{ color: 'whitesmoke', backgroundColor: '#151515', fill: '#151515' }} />
    </Tooltip>
      <div className="title-1 valign-text-middle roboto-normal-burning-orange-16px">{'version 0.3.4'}</div>
    </>
  )
}
export default ReportBar
