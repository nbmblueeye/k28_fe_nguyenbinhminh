import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./CreateMovie.scss"
import { createNewMovie, fetchAsyncMovies } from '../../redux/movies/movieSlider'
import { Spin, notification } from 'antd'
import NOTIFICATION_TYPE from '../../constants'

const CreateMovie = ({ setIsCreateNewMovie }) => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    poster: '',
  })

  const handleCreateNewMovie = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await dispatch(createNewMovie({
        accessToken: localStorage.getItem('access_token'),
        newMovie: formData}
      ))
      notification[NOTIFICATION_TYPE.success] ({
        message: "Create new movie successfully",
        placement: "topRight"
      })

      await dispatch(fetchAsyncMovies(localStorage.getItem('access_token')));
    } catch (error) {
      notification[NOTIFICATION_TYPE.error] ({
        message: "Create new movie failed",
        placement: "topRight"
      })
    }finally{
      setLoading(false)
      setIsCreateNewMovie(false)
    }
  }

  return (
    <section>
      <h1 className='title'>Create new Movie</h1>
      <form style={{
        display: 'flex',
        flexDirection: "column",
        gap:10,
        width: "500px",
        maxWidth: "500px",
      }}>
        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder='Movie title' className='input' autoFocus/>
        <input type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder='Year release' className='input'/>
        <textarea type="text" name="" rows="4" value={formData.poster} onChange={e => setFormData({...formData, poster: e.target.value})} placeholder='Movie Poster' className='input'></textarea>
        <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <button className='btn btn-next'
            onClick={(e) => handleCreateNewMovie(e)}
            disabled={loading}
          >
            Create
            {
              loading && <Spin style={{
                marginLeft: 10
              }} 
              size='small'
              />
            }
          </button> 
          <button className='btn btn-back'
            onClick={() => setIsCreateNewMovie(false)}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateMovie