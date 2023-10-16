import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Courses from '../Courses'
import './index.css'

const apiStatusConstant = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    courseList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderCourseLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" width={50} height={50} />
    </div>
  )

  onClickRetry = () => {
    this.getCourseData()
  }

  renderCourseViewFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderCourseViewSuccess = () => {
    const {courseList} = this.state
    return (
      <div className="success-container">
        <h1 className="courser-heading">Courses</h1>
        <ul className="course-list">
          {courseList.map(each => (
            <Courses key={each.id} courseDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderCourseView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderCourseLoader()
      case apiStatusConstant.success:
        return this.renderCourseViewSuccess()
      case apiStatusConstant.failure:
        return this.renderCourseViewFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseView()}
      </>
    )
  }
}
export default Home
