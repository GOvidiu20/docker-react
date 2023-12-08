// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './style.scss'
function CustomNavbar() {
    return (
        <Navbar className="navbar-color" variant="dark">
            <Container className="container-max-width">
                <Nav className="d-flex justify-content-between w-100">
                    <Nav.Link href="/home" >Home</Nav.Link>
                    <Nav.Link href="/playlists">Playlists</Nav.Link>
                    <Nav.Link href="/recommendations">Recommendations</Nav.Link>
                    <Nav.Link href="/history">History</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
