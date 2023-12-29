import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'
import './style.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
]
function CustomNavbar() {
    const currentLocation = '/' + useLocation()['pathname'].split('/')[1];
    const navigate = useNavigate();
    function signOut() {
        localStorage.clear();
        navigate('/login');
    }

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
                    <NavDropdown title={<AccountCircleIcon fontSize="large"/>} id="avatar-dropdown">
                        <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={ () => signOut()}>
                            Log out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
