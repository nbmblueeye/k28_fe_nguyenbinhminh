import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlider";
import { removeMovie } from "../redux/movies/movieSlider";

const Layout = () => {

  const dispatch = useDispatch();
  const user = useSelector(auth => auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    if(confirm("Are you sure you want to log out")){
      dispatch(logout(localStorage.getItem("access_token")));
      dispatch(removeMovie());
      navigate("/");
    }
  };

  return (
    <>
        <header style={{backgroundColor: "#6366F1",padding: "30px 20px"}}>
          <div style={{
            display: "flex",
            justifyContent:"space-between",
            alignItems: "center",
          }}>
            <Link
              style={{
                color: "white",
                cursor: "pointer"
              }}
                title='Home'
                to={user?.email ? "/":"/login"} className='fa-solid fa-home'
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
                      cursor: "pointer"
                    }}
                      title='Edit movie'
                      to='/admin' className='fa-solid fa-pen-to-square'
                    />
                  }
                <button style={{cursor: "pointer"}} title="Logout" className="" onClick={handleLogout}/>
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