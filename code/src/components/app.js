import React from "react"
import Station from "./Station/station.js"

class App extends React.Component {
state = {
  radioList: [],
  filteredRadioList: [],
  retrolook: false,
  nrOfPlaceholderItems: 4
}

componentDidMount = () => {
  const url = "https://api.sr.se/api/v2/channels?format=json&size=100"
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(result => {
      this.setState({
        radioList: result.channels,
        filteredRadioList: result.channels
      })
    })
}

// Case insensitive match of user search string towards channel tagline and title
// Also matches an empty serch field with all channels
userSearch = (e) => {
  let filterBySearch = []
  if (e.target.value) {
    filterBySearch = this.state.radioList.filter(channel => {
      if (!channel.tagline) {
          channel.tagline = ""
      }
        return channel.tagline.toLowerCase().includes(e.target.value.toLowerCase()) ||
        channel.name.toLowerCase().includes(e.target.value.toLowerCase())
      }
    )
  } else {
      filterBySearch = this.state.radioList
  }
  this.setState({
    filteredRadioList: filterBySearch
  })
}

// Gives entire page a retro look when clicking the old radio image
toggleBW = () => {
  this.setState({
    retrolook: !this.state.retrolook
  })
}

createLoadingPage = (nrOfPlaceholderItems) => {
  let placeholderItems = []
  for (let i = 0; i < nrOfPlaceholderItems; i++) {
    placeholderItems.push(<Station image="./images/placeholder.jpg" name="Laddar kanal..." key={i}/>)
  }
  return placeholderItems
}

render() {

  if (this.state.radioList.length > 0) {
    return (
      <div className={this.state.retrolook ? "master-wrapper retrolook" : "master-wrapper"}>

        <header>
          <div className="logo-container">
            <img src="./images/oldradio.png" alt="Radio" onClick={this.toggleBW} className="oldradio"/>
            <a href="https://sverigesradio.se/" target="_blank">
              <img src="./images/srlogo.png" alt="Sveriges Radio" />
            </a>
            <a href="https://sv.wikipedia.org/wiki/Radiohead" target="_blank">
              <img src="./images/radiohead-logo.png" alt="Radiohead" className="radiohead-logo" />
            </a>
          </div>
        </header>

        <section className="search-container">
          <h4 className="nrStations-listed">Antal listade kanaler: {this.state.filteredRadioList.length}</h4>
          <div className="searchContainer">
            <input
              autoFocus="autofocus"
              type="text"
              className="searchBar"
              name="radioSearch"
              placeholder="Sök efter nyckelord"
              onChange={this.userSearch}/>
          </div>
        </section>
        <section className="stations-container">
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
          <header>
            <div className="logo-container">
              <a href="https://sverigesradio.se/">
                <img src="./images/srlogo.png" alt="Sveriges Radio"/>
              </a>
            </div>
          </header>
          <section className="stations-container">
            {this.createLoadingPage(this.state.nrOfPlaceholderItems)}
          </section>
        </div>
      )
  }
}

}

export default App
