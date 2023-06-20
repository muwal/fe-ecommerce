import React, { useEffect, useState } from "react"
import '../../public/css/navbar.css'
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../services/auth.service";
import Home from "../pages/home.pages";
import Login from "../pages/login.pages";
import Register from "../pages/register.pages";

export default function Navbar() {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }



        // EventBus.on("logout", () => {
        //     logOut();
        // });

        // return () => {
        //     EventBus.remove("logout");
        // };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };
    return (
        <>
            <div className="header">
                <nav className="navbar">
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {currentUser.name}
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : 'gagal'}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

