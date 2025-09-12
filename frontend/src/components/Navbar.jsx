import React from 'react'
import {Link} from 'react-router-dom'

function Navbar({user,onLogout}){
    return(
        <nav style={{
            background: 'white',
      padding: '15px 30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '30px'}}>
            <div style={{maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'}}>
                <Link to="/" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#667eea',
          textDecoration: 'none'
        }}>Finance Tracker</Link>
                <div>
                    {
                        user?(
                            <>
                            <span style={{marginRight: '20px', color: '#666'}}>Welcome, {user.name}!</span>
                            <Link to="/add" className="btn btn-primary" style={{textDecoration: 'none',
                marginRight: '10px'}}>Add Transaction</Link>
                            <button onClick={onLogout} className='btn btn-danger'>Logout</button>
                            </>
                        ):(
                          <>
                          <Link to="/login" className="btn btn-primary" style={{textDecoration: 'none',
                marginRight: '10px'}}>Login</Link>
                          <Link to="/register" className="btn btn-success"style={{textDecoration: 'none'}}>Register</Link>
                          </>
                        )
                    }
                </div>
            </div>
            
        </nav>
    )

}
export default Navbar;