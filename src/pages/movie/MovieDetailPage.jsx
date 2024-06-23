import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useRef, } from "react";
import { Spin, notification } from "antd"
import NOTIFICATION_TYPE from '../../constants';
import './MovieDetailPage.scss'
import MovieDetail from "../../components/MovieDetail/MovieDetail";

import { fetchAsyncMovie, getMovie, removeMovie } from "../../redux/movies/movieSlider";

const MovieDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(getMovie);

  const fetchMovie = async() => {
    if(localStorage.getItem("access_token") && id){
      const data = await dispatch( fetchAsyncMovie({accessToken: localStorage.getItem("access_token"), id}))
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

  const getData = useRef(true) 
  useEffect(() => {
    if(getData.current){
      fetchMovie()
    }
    return () => {
      dispatch( removeMovie() )
      getData.current = false
    }
  },[localStorage.getItem("access_token"), id])
  return (
     <section className="container">
       <h1 className="title">Movie Detail</h1>
      {
        Object.keys(movie).length === 0 ? (
          <div style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}>
            <Spin size="large"/>
          </div>
        )
        :
        (
          <>
            <MovieDetail movie={movie?.movie}/>
          </>
        )
      }
     </section>
  )
}

export default MovieDetailPage
