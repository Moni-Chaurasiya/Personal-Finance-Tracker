import React ,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import api from '../utils/api'

function Register({onLogin}){
    const [formData,setFormData]= useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const [error,setError] =useState('');

    const navigate=useNavigate();

    const handleChange=(e)=>{
     setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(formData.password != formData.confirmPassword){
            setError('Password do not match');
            return
        }
        try {
            const response= await api.post('/auth/register',{
                name:formData.name,
                email:formData.email,
                password:formData.password
            })
            onLogin(response.data.token,response.data.user);
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message || 'Registeration failed')
        }
    }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Create Your Account
        </h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          
          <button type="submit" className="btn btn-success" style={{ width: '100%' }}>
            Register
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
export default Register