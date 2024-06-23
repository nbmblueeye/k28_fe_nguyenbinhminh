import { Spin } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlider";
import "./Login.scss"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);
    const data = await dispatch(login(formData));
    setTimeout(() => {
      setLoading(false);
      if(data?.payload){
        navigate('/')
       }
    }, 100);
  }
  
  return (
    <section className="card login-container" style={{
      marginTop: "20px",
    }}>
      <div className="box">
        <h1 className="title">Login to your Account</h1>
        <form className="" style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
        }} onSubmit={handleLogin}>
          <input className="input" type="email" placeholder="Email..." autoFocus name="email" value={formData.email} onChange={(e) =>setFormData({...formData, email: e.target.value})} />
          <input className="input" type="password" placeholder="Password..." name="password" value={formData.password} onChange={(e) =>setFormData({...formData, password: e.target.value})} />  
          <button className="btn-login" type='submit' disabled={loading}>
            Login
            {
              loading && <Spin style={{marginLeft: 10}} size="small"/>
            }
          </button>
          <p style={{marginTop: 5}}>
            You have not an account ? 
            <Link to='/register' style={{color: 'blue', cursor: 'pointer'}}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login
