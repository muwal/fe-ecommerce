import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, BrowserRouter } from "react-router-dom";

import Auth from "./components/auth.components";
import Register from './pages/register.pages';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Auth />} />
                    <Route path="/login" element={<Auth />} />
                    <Route exact path='/' element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
