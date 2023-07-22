import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import { useLogo } from "../../hook/useLogo";
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'
import { Hamburger } from './Hamburger'
const Navbar = () => {
    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate();
  
    const [showSearch, setShowSearch] = useState(false);
  
    const { logo, isMoblie } = useLogo();
  
    const handleLogout = useCallback(() => {
      dispatch({ type: "LOGOUT" });
      navigate("/");
      dispatch(setCurrentUser(null));
    }, [dispatch, navigate]);
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("Profile"));
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
        }
      }
      if (user) dispatch(setCurrentUser(user));
    }, [dispatch, handleLogout]);
  
    return (
      <nav className="main-nav">
        <div className="navbar">
          <div className="navbar-logo-con">
            {isMoblie && <Hamburger />}
            <Link to="/" className="nav-item nav-logo">
              <img src={logo} alt="Flowers" width={"100%"} />
            </Link>
          </div>
          <div className="navbar-links-con">
            <Link to="/" className="nav-item nav-btn">
              About
            </Link>
            <Link to="/" className="nav-item nav-btn">
              Products
            </Link>
            <Link to="/" className="nav-item nav-btn">
              For Teams
            </Link>
            <form>
              {showSearch && <input type="text" placeholder="Search..." />}
            </form>
            { User === null ? 
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link> : 
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to={`/Users/${User?._id}`} style={{color:"white", textDecoration:'none'}}>{User?.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                    </>
            }
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  