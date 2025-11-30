// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/logo.svg';


export const Navbar = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

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
                <div className="logo-pill">
                    <img src={Logo} alt="Dishcovery Logo" className="nav-logo" />
                </div>
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
                                        // later: navigate('/profile')
                                        setMenuOpen(false);
                                    }}
                                >
                                    Profile
                                </button>
                                <button
                                    className="user-menu-item"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        // later: navigate('/settings')
                                    }}
                                >
                                    Settings
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
