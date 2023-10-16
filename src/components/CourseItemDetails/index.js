import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class CourseItemDetails extends Component {
  state = {
    apiData: {},
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }
      this.setState({
        apiData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderCourseDetailsLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" width={50} height={50} />
    </div>
  )

  onClickRetryCourse = () => {
    this.getCourseDetails()
  }

  renderCourseDetailsFailure = () => (
    <div className="course-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="course-failure-image"
      />
      <h1 className="course-failure-text">Oops! Something Went Wrong</h1>
      <p className="course-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="course-retry-btn"
        onClick={this.onClickRetryCourse}
      >
        Retry
      </button>
    </div>
  )

  renderCourseDetailsSuccess = () => {
    const {apiData} = this.state
    const {imageUrl, name, description} = apiData
    return (
      <div className="course-details-container">
        <div className="responsive-container">
          <img src={imageUrl} alt={name} className="course-images" />
          <div className="course-content-container">
            <h1 className="course-name">{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderCourseDetailsLoader()
      case apiStatusConstant.failure:
        return this.renderCourseDetailsFailure()
      case apiStatusConstant.success:
        return this.renderCourseDetailsSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseDetails()}
      </>
    )
  }
}
export default CourseItemDetails
