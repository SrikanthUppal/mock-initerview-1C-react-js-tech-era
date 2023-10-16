import {Link} from 'react-router-dom'
import './index.css'

const Courses = props => {
  const {courseDetails} = props
  const {logoUrl, name, id} = courseDetails
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="course-item">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}
export default Courses
