import { Spin } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.scss'
import { register } from "../../redux/auth/authSlider";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleRegister = async(e) => {
    e.preventDefault();
    setLoading(true);
    const data = await dispatch(register({...formData}));
    console.log("Register Data", data);
    if(data?.payload){
     navigate('/login')
    }

    setLoading(false);
  }

  return (
    <section className="card regiter-container">
      <h1 className="title">Create a New Account</h1>
      <form className="" style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
      }} onSubmit={handleRegister}>
        <input className="input" type="email" placeholder="Email..." autoFocus name="email" value={formData.email} onChange={(e) =>setFormData({...formData, email: e.target.value})} />
        <input className="input" type="password" placeholder="Password..." name="password" value={formData.password} onChange={(e) =>setFormData({...formData, password: e.target.value})} />  
        <button className="btn-register" type='submit'>
          Register
          {
            loading && <Spin style={{marginLeft: 10}} size="small"/>
          }
        </button>
        <p style={{marginTop: 5}}>
          You have an account ? 
          <Link to='/login' style={{color: 'blue', cursor: 'pointer'}}>
          Login
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Register
