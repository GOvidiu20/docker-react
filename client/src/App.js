import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.scss';
import Login from "./view/pages/login/login";
import Home from "./view/pages/home/Home";
import Register from "./view/pages/register/register";
import Playlists from "./view/pages/playlists/playlists";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route element={<ProtectedRoute/>}>
                    <Route path="home" element={<Home />} />
                    <Route path="playlists" element={<Playlists />} />
                    <Route path="recommendations" element={<Home />} />
                    <Route path="history" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

const ProtectedRoute = () => {
    const token = sessionStorage.getItem('token') ?? "token";
    return token ? <Outlet /> : <Navigate to="/login" />;
};