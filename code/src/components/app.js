import React from "react"
import Station from "./Station/station.js"

class App extends React.Component {
state = {
  radioList: [],
  filteredRadioList: [],
  userSearchString: ""
}


componentDidMount = () => {
  const url = "http://api.sr.se/api/v2/channels?format=json&size=100"
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(result => {
      console.log(result.channels)
      this.setState({
        radioList: result.channels,
        filteredRadioList: result.channels
      })
    })
}

componentWillUnmount = () => {
}

filterList = () => {
  this.setState({
    filteredRadioList: this.state.radioList.filter(channel => {
      return channel.channeltype.indexOf(this.state.userSearchString) != -1})
    })
}


userSearch = (e) => {
  this.setState({
    userSearchString: e.target.value
  })
  this.filterList()
}

render() {

  if (this.state.radioList.length > 0) {
    return (
      <div className="master-wrapper">

        <header>
          <h1>RADIO</h1>
        </header>

        <section className="search-container">
          <h3 className="nrStations-listed">Antal listade kanaler: {this.state.radioList.length}</h3>
          <div className="searchContainer">
            <input type="text" className="searchBar" name="radioSearch" placeholder="Sök efter nyckelord" onChange={this.userSearch}/>
          </div>
        </section>

        <section className="stations-container">
          {console.log(this.state.userSearchString)}
          {console.log(this.state.filteredRadioList)}
          {this.state.filteredRadioList.map((channel, index) => {
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
