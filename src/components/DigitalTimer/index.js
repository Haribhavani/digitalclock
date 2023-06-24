// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSec: 0,
  timeLimitInMinute: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onResetTimer() {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onDeceaseTimerLimit = () => {
    const {timeLimitInMinute} = this.state

    if (timeLimitInMinute > 1) {
      this.setState(prevState => ({
        timeLimitInMinute: prevState.timeLimitInMinute - 1,
      }))
    }
  }

  onIncreaseTimerLimit = () => {
    this.setState(prevState => ({
      timeLimitInMinute: prevState.timeLimitInMinute + 1,
    }))
  }

  renderTimeLimitController = () => {
    const {timeLimitInMinute, timeElapsedInSec} = this.state
    const isButtonDisabled = timeElapsedInSec > 0

    return (
      <div className="limit-timer-controller">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-con">
          <button
            type="button"
            className="button"
            disabled={isButtonDisabled}
            onClick={this.onDeceaseTimerLimit}
          >
            -
          </button>

          <div className="limit-label-value-con">
            <p className="para">{timeLimitInMinute}</p>
          </div>
          <button
            type="button"
            className="button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimit}
            value={timeLimitInMinute}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  incrementTimerElapsedInSec = () => {
    const {timeElapsedInSec, timeLimitInMinute} = this.state
    const isTimerCompleted = timeElapsedInSec === timeLimitInMinute * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSec: prevState.timeElapsedInSec + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSec, timeLimitInMinute} = this.state
    const isTimerCompeted = timeElapsedInSec === timeLimitInMinute * 60

    if (isTimerCompeted) {
      this.setState({timeElapsedInSec: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSec, 1000)
    }

    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-con">
        <button
          type="button"
          className="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img src={imgUrl} alt={altText} className="image" />
          <p className="para">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>

        <button type="button" className="button" onClick={this.onResetTimer}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p className="para">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondInTimeFormat = () => {
    const {timeElapsedInSec, timeLimitInMinute} = this.state

    const totalRemainingSec = timeLimitInMinute * 60 - timeElapsedInSec

    const minutes = Math.floor(totalRemainingSec / 60)
    const seconds = Math.floor(totalRemainingSec % 60)
    const stringFieldMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringFieldSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringFieldMinutes} : ${stringFieldSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="bg-con">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-time-con">
          <div className="timer-display-con">
            <div className="reload-con">
              <h1 className="elapsed-time">
                {this.getElapsedSecondInTimeFormat()}
              </h1>
              <p className="para">{labelText}</p>
            </div>
          </div>
          <div className="control-con">
            {this.renderTimerController()}
            {this.renderTimeLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
