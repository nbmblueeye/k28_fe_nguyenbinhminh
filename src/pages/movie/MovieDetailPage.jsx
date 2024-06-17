import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAsyncMovie, getMovie, removeMovie } from "../../redux/movies/movieSlider";
import { useEffect } from "react";
import { Spin, notification } from "antd"
import NOTIFICATION_TYPE from '../../constants';
import './MovieDetailPage.scss'
import MovieDetail from "../../components/MovieDetail/MovieDetail";

const MovieDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(getMovie);

  const fetchMovie = async() => {
    if(localStorage.getItem("access_token") && id){
      const data = await dispatch( fetchAsyncMovie({accessToken: localStorage.getItem("access_token"), id}))
      console.log("data in movie detail", data);
      if(data?.payload){
        notification[NOTIFICATION_TYPE.success] ({
          message: "get movie successfully",
          placement: "topRight"
        })
      }else{
        notification[NOTIFICATION_TYPE.error] ({
          message: "get movie failed",
          placement: "topRight"
        })
      }
    }
  }

  useEffect(() => {
    fetchMovie()
    return () => {
      dispatch( removeMovie() )
    }

  },[localStorage.getItem("access_token"), id])
  return (
     <section>
       <h1 className="title">Movie</h1>
      {
        Object.keys(movie).length === 0 ? (
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
            <MovieDetail movie={movie}/>
          </>
        )
      }
     </section>
  )
}

export default MovieDetailPage
