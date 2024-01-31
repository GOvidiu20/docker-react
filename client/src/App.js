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
import Playlists from "./view/pages/playlists/index";
import PlaylistChange from "./view/pages/playlists/edit";
import Recommendations from "./view/pages/recommendations";
import Profile from "./view/pages/profile";
import PlaylistShare from "./view/pages/playlists/share";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route element={<ProtectedRoute/>}>
                    <Route path="home" element={<Home />} />
                    <Route path="playlists/*" element={<PlaylistRoutes />}/>
                    <Route path="recommendations" element={<Recommendations />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/login" />;
};

const PlaylistRoutes = () => {
    return (
        <Routes>
            <Route index element={<Playlists />} />
            <Route path="create" element={<PlaylistChange />} />
            <Route path=":id" element={<Playlists />} />
            <Route path=":id/edit" element={<PlaylistChange />} />
            <Route path=":id/share" element={<PlaylistShare />} />
        </Routes>
    );
};