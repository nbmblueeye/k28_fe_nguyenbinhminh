import { useMemo, useState } from "react";
import { getMovies } from "../../redux/movies/movieSlider";
import CreateMovie from "../../components/CreateMovie/CreateMovie";

const DashboardAdmin = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const movies = useSelector(getMovies);

  console.log("Movie in admin page", movies);

  const [ isCreateNewMovie, setIsCreateNewMovie] = useState(false);
  const [ isUpdateMovie, setIsUpdateMovie] = useState(false);
  const [ isSelectedMovie, setIsSelectedMovie] = useState('');

  const selectedMovie = useMemo(() => {
    return movies.find(movie => movie._id === isSelectedMovie)
  },[isSelectedMovie, movies]);

  return (
    <div>
       <h1 className="title">Admin Dashboard</h1>

       <button className="new-movie-btn" onClick={() => setIsCreateNewMovie(true)}>
          New Movie
       </button>

       {
        isCreateNewMovie && <CreateMovie setIsCreateNewMovie={setIsCreateNewMovie}/>

       }
    </div>
  )
}

export default DashboardAdmin