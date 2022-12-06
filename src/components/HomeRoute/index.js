import {Component} from 'react'

import {BsX} from 'react-icons/bs'
import Cookies from 'js-cookie'

import Header from '../Header'
import VideoItem from '../VideoItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class HomeRoute extends Component {
  state = {
    detailsList: '',
    channelDetails: '',
    apiStatus: apiConstants.initial,
    searchInput: '',
  }

  getDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.videos.map(each => ({
        id: each.id,
        channel: each.channel,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))

      console.log(data)

      const updatedChannel = data.videos.map(each => ({
        name: each.channel.name,
        profileImageIrl: each.channel.profile_image_url,
      }))

      this.setState({
        detailsList: updatedData,
        channelDetails: updatedChannel,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  componentDidMount = () => {
    this.getDetails()
  }

  renderPremiumView = () => (
    <div className="premium-container">
      <button type="button" className="cross-button">
        <BsX className="cross-icon" />
      </button>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="nxt watch logo"
        className="nxt-watch-logo"
      />
      <h3 className="premium-head">
        Buy Nxt Watch Premium prepaid plan with UPI
      </h3>
      <button type="button" className="get-it-now-button">
        GET IT NOW
      </button>
    </div>
  )

  render() {
    const {detailsList} = this.state
    console.log(detailsList)

    return (
      <>
        <Header />
        {this.renderPremiumView()}
        <div>
          <input type="search" />
          <ul>
            {detailsList.map(each => (
              <VideoItem eachItem={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default HomeRoute
