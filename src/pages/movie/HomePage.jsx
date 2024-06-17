/* eslint-disable no-undef */
import { useDispatch, useSelector } from "react-redux"
import { fetchAsyncMovies, getMovies } from "../../redux/movies/movieSlider"
import { useEffect } from "react"
import { Spin, notification } from "antd"
import NOTIFICATION_TYPE from '../../constants';
import MovieListing from "../../components/movieListing/MovieListing";
import './HomePage.scss'

const HomePage = () => {

  const dispatch = useDispatch()
  const movies = useSelector(getMovies)

  const fetchMovies = async() => {
    if(localStorage.getItem("access_token") && movies.length === 0) {
      const data = await dispatch( fetchAsyncMovies(localStorage.getItem("access_token")))
      console.log("data in movies", data)
      if(data?.payload){
        notification[NOTIFICATION_TYPE.success] ({
          message: "get movies successfully",
          placement: "topRight"
        })
      }else{
        notification[NOTIFICATION_TYPE.error] ({
          message: "get movies failed",
          placement: "topRight"
        })
      }
    }
  }

  useEffect( () => {
    fetchMovies()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[movies.length, localStorage.getItem("access_token")])

  
  return (
    <section>
      <h1 className="title">Movies</h1>
      {
        movies.length === 0 ? (
          <div style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}>
            <Spin/>
          </div>
        )
        :
        (
          <>
            <MovieListing movies={movies}/>
          </>
        )
      }
    </section>
  )
}

export default HomePage