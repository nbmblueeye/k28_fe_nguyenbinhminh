import { Spin, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncMovies, updateMovie } from '../../redux/movies/movieSlider'
import "./UpdateMovie.scss"
import NOTIFICATION_TYPE from '../../constants'

const UpdateMovie = ({selectedMovie, setIsUpdateMovie}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: selectedMovie.title,
    year: selectedMovie.year,
    poster: selectedMovie.poster,
  })

  const handleUpdateMovie = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await dispatch(updateMovie({
        accessToken: localStorage.getItem('access_token'),
        dataUpdate: formData,
        id: selectedMovie._id,
      }))

      notification[NOTIFICATION_TYPE.success] ({
        message: "Movie is updated successfully",
        placement: "topRight"
      })
      await dispatch(fetchAsyncMovies(localStorage.getItem('access_token')));
    } catch (error) {
      notification[NOTIFICATION_TYPE.error] ({
        message: "Movie Update is failed",
        placement: "topRight"
      })
    }finally{
      setLoading(false)
      setIsUpdateMovie(false)
    }
  }

  return (
    <section>
      <h1 className='title'>Update Movie</h1>
      <form style={{
        display: 'flex',
        flexDirection: "column",
        gap:10,
        width: "500px",
        maxWidth: "500px",
      }}>
        <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder='Movie title' className='input' autoFocus/>
        <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} placeholder='Year release' className='input'/>
        <textarea type="text" name="" rows="4" value={formData.poster} onChange={(e) => setFormData({...formData, poster: e.target.value})} placeholder='Movie Poster' className='input'></textarea>
        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <button className='btn btn-next'
            onClick={(e) => handleUpdateMovie(e)}
            disabled={loading}
          >
            Update
            {
              loading && <Spin style={{
                marginLeft: 10,
                color: "#ffffff",
              }} size='small' />
            }
          </button> 
          <button className='btn btn-back'
            onClick={() => setIsUpdateMovie(false)}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default UpdateMovie
