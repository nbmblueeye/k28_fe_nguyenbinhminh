/* eslint-disable react/prop-types */
import MovieCard from "../MovieCard/MovieCard"

const MovieListing = ({movies}) => {
  
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <div className="movie-container">
          {
            movies.map(movie => {
              return (
                <div key={movie.id}>
                  <MovieCard movie={movie}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MovieListing
