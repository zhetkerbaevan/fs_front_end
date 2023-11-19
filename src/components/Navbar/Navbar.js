import React, {useEffect} from "react";
import $ from 'jquery';
import './Navbar.css';
import { NavLink} from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    function animation(){
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
            "top":itemPosNewAnimTop.top + "px",
            "left":itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click","li",function(e){
            $('#navbarSupportedContent ul li').removeClass("active");
            $(this).addClass('active');
            var activeWidthNewAnimHeight = $(this).innerHeight();
            var activeWidthNewAnimWidth = $(this).innerWidth();
            var itemPosNewAnimTop = $(this).position();
            var itemPosNewAnimLeft = $(this).position();
            $(".hori-selector").css({
                "top":itemPosNewAnimTop.top + "px",
                "left":itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
        });
    }

    useEffect(() => {
        animation();
        $(window).on('resize', function() {
            setTimeout(function () {
                animation();
            }, 500);
        });
    }, []);


    return (
            <nav className="nav navbar-expand-lg navbar-mainbg navbar-custom">
                <a className="navbar-brand navbar-logo" href="/">Know Style!</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>
                        {isAuthenticated && (
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/" exact>
                                <i className="fas fa-gem"></i>
                                Home
                            </NavLink>
                        </li>
                        )}
                        {isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search" exact>
                                <i className="fas fa-search"></i>
                                Search
                            </NavLink>
                        </li>
                        )}
                        {isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/add/jewelry" exact>
                                <i className="fas fa-ring"></i>
                                Add Jewelry
                            </NavLink>
                        </li>
                        )}
                        {isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/jewelries" exact>
                                <i className="fas fa-edit"></i>
                                Jewelries (admin)
                            </NavLink>
                        </li>
                        )}
                        {isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users" exact>
                                <i className="fas fa-users"></i>
                                Users (admin)
                            </NavLink>
                        </li>
                        )}
                        {isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/aboutUs" exact>
                                <i className="fas fa-user-circle"></i>
                                About Us
                            </NavLink>
                        </li>
                        )}
                        {isAuthenticated && (
                         <li className="nav-item">
                             <NavLink className="nav-link" to="/login" exact>
                                <i className="fas fa-sign-out-alt"></i>
                                 <button class="btn btn-transparent text-reset m-0 p-0" onClick={logout}>
                                 Logout
                                 </button>
                             </NavLink>
                            </li>
                         )}
                        {!isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login" exact>
                                <i className="fas fa-users"></i>
                                Login
                            </NavLink>
                        </li>
                        )}
                        {!isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/registration" exact>
                                <i className="fas fa-users"></i>
                                Registration
                            </NavLink>
                        </li>
                        )}
                    </ul>
                </div>
            </nav>
    )
}
export default Navbar;