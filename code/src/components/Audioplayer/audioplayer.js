import React from "react"
import "./audioplayer.css"

class Audioplayer extends React.Component {

  render() {
    return (
      <div className="audioplayer-wrapper">
        <audio controls className="audioplayer">
          <source src={this.props.audiofeed} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
    )
  }
}

export default Audioplayer
