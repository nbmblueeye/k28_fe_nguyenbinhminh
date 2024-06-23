/* eslint-disable react/prop-types */
import './MovieDetail.scss'

const MovieDetail = ({ movie }) => {

  const { title, year, poster } = movie 

  return (
    <div className="movie-section">
      <div className="section-right">
        <img src={poster} alt={title}/>
      </div>
      <div className="section-left">
        <p className='movie-title'>
          {title}
        </p>
        <p>Year <i className="fa-solid fa-calendar-days"></i>: {year} </p>
      </div>
    </div>
  )
}

export default MovieDetail