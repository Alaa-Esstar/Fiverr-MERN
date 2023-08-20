import React, { useEffect, useState } from 'react'
import "./NavBar.scss"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const NavBar = () => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { pathname } = useLocation()

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
            window.removeEventListener("scroll", isActive);
        }
    }, []);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser", null)
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className='link'>
                        <span className='text'>fiverr</span>
                    </Link>
                    <span className='dot'>.</span>
                </div>
                <div className="links">
                    <span>Fiverr Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <span>
                        <Link className='link' to="/login">
                            Sign in
                        </Link>
                    </span>
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {!currentUser &&
                        <Link className='link' to="/register">
                            <button>Join</button>
                        </Link>
                    }
                    {currentUser && (
                        <div className="user" onClick={() => setOpen(!open)}>
                            <img src={currentUser.img || "./img/noavatar.jpg"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options">
                                {currentUser?.isSeller && (
                                    <>
                                        <Link className='link' to="/mygigs">Gigs</Link>
                                        <Link className='link' to="/add">Add new Gig</Link>
                                    </>
                                )}
                                <Link className='link' to="/orders">Orders</Link>
                                <Link className='link' to="/messages">Messages</Link>
                                <Link className='link' onClick={handleLogout}>Logout</Link>
                            </div>}
                        </div>
                    )}
                </div>
            </div>
            {(active || pathname !== "/") && (
                <>
                    <hr />
                    <div className="menu">
                        <Link to="/" className='link menuLink'>
                            Graphics & Design
                        </Link>
                        <Link to="/" className='link menuLink'>
                            Video & Animation
                        </Link>
                        <Link to="/" className='link menuLink'>
                            Writing & Transition
                        </Link>
                        <Link to="/" className='link menuLink'>
                            AI Services
                        </Link>
                        <Link to="/" className='link menuLink'>
                            Digital Marketing
                        </Link>
                        <Link to="/" className='link menuLink'>
                            Music & Audio
                        </Link>
                        <Link to="/" className='link menuLink'>
                            Programming & Tech
                        </Link>
                        <Link to="/" className='link menuLink'>
                            Business
                        </Link>
                        <Link to="/" className='link menuLink'>
                            Lifestyle
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default NavBar