import React from 'react'
import {Link} from 'react-router-dom'

function Navbar({user,onLogout}){
    return(
        <nav style={{}}>
            <div style={{}}>
                <Link to="/" style={{}}>Finance Tracker</Link>
                <div>
                    {
                        user?(
                            <>
                            <span style={{}}>Welcome, {user.name}!</span>
                            <Link to="/add" className="btn btn-primary" style={{}}>Add Transaction</Link>
                            <button onClick={onLogout} className='btn btn-danger'>Logout</button>
                            </>
                        ):(
                          <>
                          <Link to="/login" className="btn btn-primary" style={{}}>Login</Link>
                          <Link to="/register" className="btn btn-success"style={{}}>Register</Link>
                          </>
                        )
                    }
                </div>
            </div>
            
        </nav>
    )

}
export default Navbar;