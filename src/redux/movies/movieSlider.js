import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import createApi from '../../common/api';



export const fetchAsyncMovies = createAsyncThunk('movie/fetchAsyncMovies', async (accessToken) => {
    try {
        const { data } = await createApi(accessToken).get("/movies");
        return data?.data.movies;
    } catch (error) {
       console.log(error);
    }
})

export const fetchAsyncMovie = createAsyncThunk('movie/fetchAsyncMovie', async ({accessToken, id}) => {
    try {
        const { data } = await createApi(accessToken).get(`/movies/${id}`);
        return data?.data;
    } catch (error) {
        console.log(error);
    }
})

export const createNewMovie = createAsyncThunk('movie/createNewMovie', async ({accessToken, newMovie}) => {
    try {
        const { data } = await createApi(accessToken).post(`/movies`, { ...newMovie });
        return data?.data;
    } catch (error) {
        console.log(error);
    }
})

export const updateMovie = createAsyncThunk('movie/updateMovie', async ({accessToken, dataUpdate, id}) => {
    try {
        const { data } = await createApi(accessToken).put(`/movies/${id}`, { ...dataUpdate });
        return data?.data;
    } catch (error) {
        console.log(error);
    }
})

export const deleteMovie = createAsyncThunk('movie/deleteMovie', async ({accessToken, id}) => {
    try {
        const { data } = await createApi(accessToken).delete(`/movies/${id}`);
        return data?.data;
    } catch (error) {
        console.log(error);
    }
})


const initialState = {
    movies: [],
    movie: {}
}

const movieSlide = createSlice({
    name: "movies",
    initialState,
    redusers: {
        removeMovies: (state) => {
            state.movies = []
        },
        removeMovie: (state) => {
            state.movie = {}
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchAsyncMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        }),

        builder.addCase(fetchAsyncMovie.fulfilled, (state, action) => {
            state.movie = action.payload
        })

    }
})

export const { removeMovie, removeMovies } = movieSlide.actions

export const getMovies = state => state.movies.movies
export const getMovie = state => state.movies.movie

export default movieSlide.reducer


