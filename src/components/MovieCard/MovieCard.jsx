/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import './MovieCard.scss';


const MovieCard = ({ movie }) => {

  const { _id, title, year, poster } = movie

  return (
    <Link to={`/movies/${_id}`}>
      <div className="card-item">
        <div className="card-inner">
          <div className="card-top">
            <img src={poster} alt={title}/>
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <h4>{title}</h4>
              <p>{year}</p>
            </div>
          </div>
        </div>    
      </div>
    </Link>
  )
}

export default MovieCard