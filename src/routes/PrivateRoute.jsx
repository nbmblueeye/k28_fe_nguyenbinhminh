import { useSelector } from "react-redux"
import { getLoggedInUser } from "../redux/auth/authSlider"
import { Navigate } from "react-router-dom"


function PrivateRoute ({element}) {
  const auth = useSelector(state => state.auth) 
  return Object.keys(auth.user).length !== 0 ? element : <Navigate to="/login" />
}

export default PrivateRoute