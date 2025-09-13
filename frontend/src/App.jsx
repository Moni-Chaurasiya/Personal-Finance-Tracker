import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbars';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import EditTransaction from './components/EditTransaction';


function App(){
  const [token,setToken]=useState(localStorage.getItem('token'))
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const storedUser= localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[])
  
  const handleLogin=(token,userData)=>{
    localStorage.setItem('token', token);
    localStorage.setItem('user',JSON.stringify(userData))
    setToken(token);
    setUser(userData);
  }

  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }

  return(
    <Router>
      <div className="App">
         <Navbar user={user} onLogout={handleLogout}/>
         <Routes>
          <Route 
            path="/"
            element={token? <Dashboard/>:<Navigate to="/login"/>}
                 />
          <Route 
            path="/login"
            element={!token? <Login onLogin={handleLogin}/> : <Navigate to="/"/>}
                 />
          <Route  
            path="/register"  
            element={!token? <Register onLogin={handleLogin}/> : <Navigate to="/"/>}
            />
          <Route  
            path="/add"
             element={token? <TransactionForm/> : <Navigate to="/login"/>}
            />
          <Route  
            path="/:id/edit"
             element={token? <EditTransaction/> : <Navigate to="/login"/>}
            />
        

         </Routes>
      </div>
    </Router>
  )
}
export default App;