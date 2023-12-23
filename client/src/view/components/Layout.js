import React from 'react';
import CustomNavbar from './navbar';
import CustomFooter from './footer';
import { Container } from 'react-bootstrap';
import './style.scss'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomLayout({ children }) {
    return (
        <div className="d-flex flex-column vh-100">
            <CustomNavbar />
                <Container className="flex-grow-1 mt-4 main-container">
                    {children}
                </Container>
                <ToastContainer />
            <CustomFooter />
        </div>
    );
}

export default CustomLayout;
