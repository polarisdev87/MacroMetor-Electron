import React from 'react'
import { Card } from 'antd'
import './styles.css'

export default function EntryReview ({ entryData }) {
  const {
    mainMissionName,
    mainMissionText,
    mainMissionScore,
    sideMissionName,
    sideMissionText,
    sideMissionScore,
    championName,
    victoryFlag,
    diaryText
  } = entryData
  const victory = victoryFlag ? ' Yes' : 'No'
  return (
    <Card bordered={false}>
      <h4>{`Champion: ${championName}`}</h4>
      <h3>{`Win: ${victory}`}</h3>
      <h3>{`Notes: ${diaryText}`}</h3>
      <br />
      <h4>{`${mainMissionName}`}</h4>
      <h3>{`Score: ${mainMissionScore}`}</h3>
      <h3>{`Notes: ${mainMissionText}`}</h3>
      <br />
      <h4>{`${sideMissionName}`}</h4>
      <h3>{`Score: ${sideMissionScore}`}</h3>
      <h3>{`Notes: ${sideMissionText}`}</h3>
      <h3>{`Violations: ${entryData.violationsArray.join(',')}`}</h3>
    </Card>
  )
}
