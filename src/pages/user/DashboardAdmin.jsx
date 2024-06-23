import { useMemo, useState } from "react";
import { deleteMovie, fetchAsyncMovies, getMovies } from "../../redux/movies/movieSlider";
import CreateMovie from "../../components/CreateMovie/CreateMovie";
import UpdateMovie from "../../components/UpdateMovie/UpdateMovie";

import "./DashboardAdmin.scss"

import { notification } from "antd";
import NOTIFICATION_TYPE, { TABLE_HEADER_CONTENTS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";

const DashboardAdmin = () => {

  const dispatch = useDispatch();
  const movies = useSelector(getMovies);
  const [ isCreateNewMovie, setIsCreateNewMovie] = useState(false);
  const [ isUpdateMovie, setIsUpdateMovie] = useState(false);
  const [ idSelectedMovie, setIdSelectedMovie] = useState('');

  const selectedMovie = useMemo(() => {
    return movies.find(movie => movie._id === idSelectedMovie)
  },[idSelectedMovie, movies]);


  const handleDeleteMovie = async(id) => {
    if(confirm('Are you sure you want to delete?')){
      try {
        await dispatch(deleteMovie({accessToken: localStorage.getItem('access_token'), id}));

        notification[NOTIFICATION_TYPE.success] ({
          message: "Delete movie successfully",
          placement: "topRight"
        })

        await dispatch(fetchAsyncMovies(localStorage.getItem('access_token')));

      } catch (error) {
        notification[NOTIFICATION_TYPE.error] ({
          message: "Delete movie failed",
          placement: "topRight"
        })
      }
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 20
    }}
    className="container"
    >
      <h1 className="title">Admin Dashboard</h1>

      <button
        onClick={() => setIsCreateNewMovie(true)}
        className="new-movie-btn"
        >
        New Movie
      </button>

      {
        isCreateNewMovie && <CreateMovie selectedMovie={selectedMovie} setIsCreateNewMovie={setIsCreateNewMovie}/>
      }
      {
        isUpdateMovie && <UpdateMovie selectedMovie={selectedMovie} setIsUpdateMovie={setIsUpdateMovie}/>
      }

      <section className="admin-table">
        <table id="admin-movies">
            <thead>
              <tr>
                {
                  TABLE_HEADER_CONTENTS.map((head, index) => 
                    <th key={index}>{head}</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                movies.length > 0 && movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{ movie._id }</td>
                    <td>{ movie.title }</td>
                    <td>{ movie.year }</td>
                    <td>
                      <img src={movie.poster} alt="movie-poster" className='movie-poster' />
                    </td>
                    <td>
                      <p 
                        className="table-body-item"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap:10
                        }}
                      >
                        <button 
                          style={{
                            cursor: 'pointer',
                            padding: "8px 16px"
                          }} 
                          onClick={() => {
                            setIsUpdateMovie(true)
                            setIdSelectedMovie(movie._id)
                          }}>
                            Edit
                        </button> 
                        <button style={{
                          cursor: 'pointer',
                          padding: "8px 16px"
                        }} 
                        onClick={() => {
                          handleDeleteMovie(movie._id)
                        }}>
                          Delete
                        </button>
                      </p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>       
      </section>

    </div>
  )
}

export default DashboardAdmin


