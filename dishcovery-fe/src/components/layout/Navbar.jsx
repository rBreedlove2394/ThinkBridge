// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export const Navbar = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();


    const handleAvatarClick = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    const userInitials =
        user?.name
            ?.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase() || 'U';

    return (
        <header className="navbar">
            {/* Left: Logo */}
            <div className="navbar-left">
                <button
                    className="logo-pill"
                    type="button"
                    onClick={() => navigate('/')}
                    aria-label="Go to home"
                >
                    <svg
                        className="nav-logo"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <circle
                            cx="11"
                            cy="11"
                            r="7"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <line
                            x1="15.5"
                            y1="15.5"
                            x2="21"
                            y2="21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="logo-text">Dishcovery</span>
                </button>
            </div>


            {/* Center: Nav links */}
            <nav className="navbar-center">
                <NavLink to="/" end>
                    Home
                </NavLink>

                {isAuthenticated && (
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                )}

                <NavLink to="/favourites">
                    Favourites
                </NavLink>

                <NavLink to="/recently-cooked">
                    Recently cooked
                </NavLink>
            </nav>

            {/* Right: Auth buttons OR user avatar */}
            <div className="navbar-right">
                {!isAuthenticated ? (
                    <>
                        <NavLink to="/login">
                            <button className="btn btn-secondary">Sign In</button>
                        </NavLink>

                        <NavLink to="/register">
                            <button className="btn btn-primary">Register</button>
                        </NavLink>

                    </>
                ) : (
                    <div className="navbar-user" onClick={handleAvatarClick}>
                        <div className="avatar">
                            {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt={user.name} />
                            ) : (
                                <span>{userInitials}</span>
                            )}
                        </div>
                        <div className="user-text">
                            <div className="user-name">{user.name}</div>
                            <div className="user-bio">{user.bio}</div>
                        </div>

                        {menuOpen && (
                            <div className="user-menu">
                                <button
                                    className="user-menu-item"
                                    onClick={() => {
                                        setMenuOpen(false);

                                        navigate('/profile')
                                    }}
                                >
                                    Profile
                                </button>
                                <button
                                    className="user-menu-item user-menu-item-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};
