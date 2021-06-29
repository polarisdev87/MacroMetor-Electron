/* eslint-disable react/prop-types */
import React from 'react'
import Countdown from 'react-countdown'
import { connect } from 'react-redux'

const overview = 'https://anima-uploads.s3.amazonaws.com/projects/60452c97d3bd48c9065bc986/releases/604533a2ab9a31396a53aeaa/img/overview@2x.svg'
/* change this Brian to make it stop at 4/12/2021 4PM EST */
const april12String = '2021-04-14'

const mapStateToProps = (state) => {
  const entries = state.entries || []
  const countedGames = entries.filter(entry => entry.countedFlag).length
  return {
    gamesPlayedNumber: countedGames || 0
  }
}

const _Overview = ({ gamesPlayedNumber }) => {
  return (
  <>
    <div className="rectangle-17 border-1px-white-3"></div>
    <div className="rectangle-18"></div>
    <img className="overview" src={overview} />
    <div className="countdown roboto-normal-white-14px" style={{ textAlign: 'right' }}>Countdown</div>
    <h1 className="text-4 roboto-normal-white-24px" style={{ color: 'whitesmoke', textAlign: 'left' }}>{<Countdown date={new Date(april12String)} />}</h1>
    <div className="active-users roboto-normal-white-14px">Games Played</div>
    <div className="text-5 roboto-normal-white-24px" style={{ color: 'whitesmoke' }}>{gamesPlayedNumber}</div>
  </>
  )
}
const Overview = connect(mapStateToProps, null)(_Overview)
export default Overview
