import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import './login.scss'
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const apiUrl = process.env.REACT_APP_BACKEND_SERVER + '/login';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }).then(data => data.json());

            if (response.jwt) {
                sessionStorage.setItem('token', response.jwt);
                sessionStorage.setItem('userId', response.id);

                setError(null);
                navigate('/home');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (error) {
            setError('Invalid credentials. Please try again.');
            console.error('Error during login:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="rounded p-4 main-color">
                        <h2 className="text-center mb-4">Login</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" block>
                                Login
                            </Button>
                        </Form>

                        <div className="mt-3 text-center">
                            <p>
                                Don't have an account? <a href="/register">Register here</a>.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}