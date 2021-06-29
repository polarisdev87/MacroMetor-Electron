/* eslint-disable react/prop-types */
import React from 'react'
import { Tag } from 'antd'
import 'antd/dist/antd.css'

const MacroTag = ({ score }) => {
  const flooredScore = Math.floor(score)
  return <Tag className={`star-${flooredScore} roboto-normal-white-12px`}>{`${flooredScore}-Star`}</Tag>
}

export default MacroTag
