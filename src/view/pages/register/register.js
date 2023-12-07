import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './register.scss'
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const apiUrl = process.env.REACT_APP_BACKEND_SERVER+'/register';

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
            });

            if (response.token) {
                sessionStorage.setItem('token', response.token);
                //navigate('/home');
            }
        } catch (error) {
            console.error('Error during register:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className="rounded p-4 main-color">
                        <h2 className="text-center mb-4">Register</h2>
                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>

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
                                Register
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}