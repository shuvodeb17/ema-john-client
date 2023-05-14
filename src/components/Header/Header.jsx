import React from "react";
import "./Header.css";
import logo from "../../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const btnLogout = () => {
    logOut()
      .then(() => { })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="header">
      <div className="container">
        <div className="main-header">
          <div className="left">
            <img src={logo} alt="" />
          </div>
          <div className="right">
            <ul>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/orders">Order Review</Link></li>
              <li><Link to="/inventory">Manage Inventory</Link></li>
              {
                user ?
                  ''
                  :
                  <li><Link to="/login">Login</Link></li>
              }
              {
                user ?
                  ''
                  :
                  <li><Link to="/registration">Registration</Link></li>
              }
              {user && <p>{user.email}</p>}
              {user &&
                <button onClick={btnLogout} className="btn btn-secondary">Logout</button>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
