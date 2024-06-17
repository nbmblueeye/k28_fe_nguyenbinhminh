import { useSelector } from "react-redux"
import { getLoggedInUser } from "../redux/auth/authSlider"
import { Navigate } from "react-router-dom"


function PrivateRoute (element) {
    const user = useSelector(getLoggedInUser)

  return Object.keys(user).length ? element : <Navigate to="/login" />
}

export default PrivateRoute