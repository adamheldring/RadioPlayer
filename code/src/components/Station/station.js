import React from "react"
import "./station.css"
import Audioplayer from "../Audioplayer/audioplayer"

class Station extends React.Component {
  render() {
    const channelColor = {
      backgroundColor: {
        backgroundColor: `#${this.props.color}`
      }
    }

    return (
      <div className="station-wrapper" style={channelColor.backgroundColor}>

        <div className="station-image-container">
          <img src={this.props.image} className="station-image" alt="station"/>
        </div>
        <div className="station-content-container">
          <h3>{this.props.name}</h3>
          <Audioplayer audiofeed={this.props.audiofeed} />
        </div>
        <div className="station-description-container">
          <p>{this.props.tagline}</p>
        </div>

      </div>
    )
  }
}

export default Station
