import React, { useEffect, useState } from "react"
import { Link, Route, Router, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Container } from "react-bootstrap";

import Login from "../pages/login.pages";
import Register from "../pages/register.pages";
import "../../public/css/auth/auth.css";

export default function Auth() {
    const location = useLocation();

    return (
        <>
            <div className="main">
                <div className="container-auth">
                    {location.pathname == '/login' ? <Login></Login> : <Register></Register>}
                </div>
            </div>
        </>
    );
}