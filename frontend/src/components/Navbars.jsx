// import React from 'react'
// import {Link} from 'react-router-dom'

// function Navbar({user,onLogout}){
//     return(
//         <nav style={{
//             background: 'white',
//       padding: '15px 30px',
//       boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//       marginBottom: '30px'}}>
//             <div style={{maxWidth: '1200px',
//         margin: '0 auto',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'}}>
//                 <Link to="/" style={{
//           fontSize: '24px',
//           fontWeight: 'bold',
//           color: '#667eea',
//           textDecoration: 'none'
//         }}>Finance Tracker</Link>
//                 <div>
//                     {
//                         user?(
//                             <>
//                             <span style={{marginRight: '20px', color: '#666'}}>Welcome, {user.name}!</span>
//                             <Link to="/add" className="btn btn-primary" style={{textDecoration: 'none',
//                 marginRight: '10px'}}>Add Transaction</Link>
//                             <button onClick={onLogout} className='btn btn-danger'>Logout</button>
//                             </>
//                         ):(
//                           <>
//                           <Link to="/login" className="btn btn-primary" style={{textDecoration: 'none',
//                 marginRight: '10px'}}>Login</Link>
//                           <Link to="/register" className="btn btn-success"style={{textDecoration: 'none'}}>Register</Link>
//                           </>
//                         )
//                     }
//                 </div>
//             </div>
            
//         </nav>
//     )

// }
// export default Navbar;




import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa"; // Icons

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        background: "white",
        padding: "10px 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
  
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            src="/budget.png"
            alt="Finance Logo"
            style={{ width: "35px", height: "35px", marginRight: "10px" }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#667eea",
              whiteSpace: "nowrap",
            }}
          >
            Finance Tracker
          </span>
        </Link>

    
        <div className="nav-links" style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
         
              <span
                style={{
                  marginRight: "15px",
                  color: "#666",
        
              
                }}
                className="welcome-text"
              >
                Welcome, {user.name}!
              </span>


              <Link
                to="/add"
             
                title="Add Transaction"
                className="btn btn-primary"
                style={{
                  textDecoration: "none",
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span className="nav-text">Add Transaction</span>
                <FaPlus className="nav-icon" />
              </Link>

              {/* Logout */}
              <button
                onClick={onLogout}
             
                className='btn btn-danger'
                title="Logout"
                // style={{
                //   border: "none",
                //   background: "#dc3545",
                //   color: "white",
                //   padding: "8px 14px",
                //   borderRadius: "5px",
                //   cursor: "pointer",
                //   display: "flex",
                //   alignItems: "center",
                  
                // }}
              >
                <span className="nav-text">Logout</span>
                <FaSignOutAlt className="nav-icon" />
              </button>
            </>
          ) : (
            <>

              <Link
                to="/login"
                className="nav-btn login-btn"
                title="Login"
                style={{
                  textDecoration: "none",
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span className="btn btn-primary nav-text">Login</span>
                <FaSignInAlt className="nav-icon" />
              </Link>

     
              <Link
                to="/register"
                className="nav-btn register-btn"
                title="Register"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span className="btn btn-success nav-text">Register</span>
                <FaUserPlus className="nav-icon" />
              </Link>
            </>
          )}
        </div>
      </div>

    
      <style>{`
        @media (max-width: 768px) {
          .nav-text {
            display: none; /* Hide text on small screens */
          }
          .nav-icon {
            font-size: 20px;
            display: inline-block;
          }
          .add-btn, .login-btn, .register-btn, .logout-btn {
            padding: 6px 10px;
            background: none;
            border: none;
            color: #667eea;
          }
          .logout-btn {
            color: #dc3545;
          }
        .welcome-text {
            display: none;
          }

       }

        @media (min-width: 769px) {
          .nav-icon {
            display: none; 
          }

          .nav-text {
            display: inline-block;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
