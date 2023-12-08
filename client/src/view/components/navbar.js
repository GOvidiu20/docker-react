import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import './style.scss'

const navbarItems = [
    {
        name: 'Home',
        pathname: '/home'
    },
    {
        name: 'Playlists',
        pathname: '/playlists'
    },
    {
        name: 'Recommendations',
        pathname: '/recommendations'
    },
    {
        name: 'History',
        pathname: '/history'
    }
]
function CustomNavbar() {
    const currentLocation = useLocation()['pathname'];
    return (
        <Navbar className="navbar-color" variant="dark">
            <Container className="container-max-width">
                <Nav className="d-flex justify-content-between w-100">
                    {
                        navbarItems.map((item, index) => (
                            <Nav.Link key={index} href={item.pathname} className={currentLocation === item.pathname ? "text-success fs-5" : "fs-5"}>
                                {item.name}
                            </Nav.Link>
                        ))
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
