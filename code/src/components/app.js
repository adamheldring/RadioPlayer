import React from "react"
import Station from "./Station/station.js"

class App extends React.Component {
state = {
  radioList: []
}

componentDidMount = () => {
  const url = "http://api.sr.se/api/v2/channels?format=json&size=100"
  fetch(url)
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(result => {
      console.log(result)
      console.log(result.channels)
      this.setState({
        radioList: result.channels
      })
    })
}

componentWillUnmount = () => {
}

render() {
  if (this.state.radioList.length > 0) {
    return (
      <div className="master-wrapper">
        <header>
          <h1>RADIO</h1>
        </header>
        <section className="stations-container">
          <h3 className="nrStations-listed">Number of stations listed: {this.state.radioList.length}</h3>

          {this.state.radioList.map((channel, index) => {
            return <Station
              key={index}
              id={channel.id}
              name={channel.name}
              channeltype={channel.channeltype}
              color={channel.color}
              image={channel.image}
              audiofeed={channel.liveaudio.url}
              scheduleurl={channel.scheduleurl}
              tagline={channel.tagline}
            />
          })}
        </section>


      </div>
    )
  } else {
    return (
      <div className="master-wrapper">
        <h1>Loading...</h1>
        <Station />
      </div>
    )
  }
}

}

export default App
