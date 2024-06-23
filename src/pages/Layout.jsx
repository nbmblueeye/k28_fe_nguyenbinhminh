import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlider";
import { removeMovie, removeMovies } from "../redux/movies/movieSlider";

const Layout = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    if(confirm("Are you sure you want to log out")){
      dispatch(logout(localStorage.getItem("access_token")));
      dispatch(removeMovies())
      dispatch(removeMovie())

      navigate('/login')
    }
  };

  return (
    <>
      <header style={{backgroundColor: "#6366F1",padding: "30px 20px"}}>
        <div style={{
          display: "flex",
          justifyContent:"space-between",
          alignItems: "center",
        }} className="container">
          <Link
            style={{
              color: "white",
              cursor: "pointer"
            }}
              title='Home'
              to={user?.email ? "/":"/login"} 
              className='fa-solid fa-home auth-btn'
          />
            
            { user?.email  && (<div
            style={{
              dispatch:"flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 5
            }}
            >
              {
                user?.role === "admin" && 
                <Link
                  style={{
                    color: "white",
                    cursor: "pointer",
                    marginRight:"32px",
                    fontSize:"18px"
                  }}
                  title='Edit movie'
                  to='/admin' 
                  className='fa-solid fa-pen-to-square auth-btn'
                />
              }
              <button style={{
                cursor: "pointer",
                padding: "8px 12px",
                }} 
                title='Logout'
                onClick={handleLogout}
                className='fa-solid fa-right-from-bracket auth-btn'
              />
                
            </div>)
          }
        </div>
      </header>

      <main style={{
        padding: "30px 20px",
      }}>
        <Outlet/>
      </main>
      
    </>
  )
}

export default Layout