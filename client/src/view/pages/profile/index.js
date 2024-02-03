import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout";
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import './profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import IconButton from "@mui/material/IconButton";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {toast} from "react-toastify";

export default function Profile() {

    const [user, setUser] = useState();
    const [newName, setNewName] = useState();
    const [newPassword, setNewPassword] = useState();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codeFromUrl = urlParams.get('code');
        if(codeFromUrl)
            updateUserSpotifyToken(codeFromUrl)
    }, []);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/user/' + localStorage.getItem('userId'), {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => response.json())
                .then(data => setUser(data))
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    async function connectToSpotify() {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/spotify/login', {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        title: "Access link to finalize Spotify connection",
                        html: '<a href=' + data.uri + '>' + data.uri + '</a>',
                        showConfirmButton: false,
                    });
                })
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    async function updateUserSpotifyToken(token) {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/spotify/getToken?code=' + token + '&userId=' + localStorage.getItem('userId'), {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => {
                    if(response.status === 200)
                        toast.success("Successfully updated Spotify token!", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    else
                        toast.error("Update playlist failed, please try again later!", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                })
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    async function updateUser(){
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/user/update', {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    'id' : user.id,
                    'email' : user.email,
                    'name' : newName,
                    'password' : newPassword,
                }),
            })
                .then(response => response.json())
                .then(data =>
                    toast.success("Successfully updated user!", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                )
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    return (
       <CustomLayout>
           <Container className="mt-5">
               <Row className="mt-5 container-scrollable">
                   <Col className="w-100 h-100">
                       <Card className="info-cart">
                           <Card.Body>
                               <Card.Title className="text-light">
                                   General Informations
                               </Card.Title>
                               <Card.Text className="text-secondary">
                                   <Form.Group className="mb-3">
                                       <Form.Label>Name</Form.Label>
                                       <Form.Control
                                           type="text"
                                           id="new_name"
                                           placeholder={user && user.name }
                                           onChange={(e) => setNewName(e.target.value)}
                                       />
                                   </Form.Group>

                                   <Form.Group className="mb-3">
                                       <Form.Label>New Password</Form.Label>
                                       <Form.Control
                                           type="password"
                                           id="new_password"
                                           onChange={(e) => setNewPassword(e.target.value)}
                                       />
                                   </Form.Group>

                                   <Button onClick={() => updateUser()}>Update</Button>
                               </Card.Text>
                           </Card.Body>
                       </Card>
                   </Col>
                   <Col className="w-100 h-100">
                       <Card className="info-cart">
                           <Card.Body>
                               <Card.Title className="text-light">
                                   Connect to spotify
                               </Card.Title>
                               <Card.Text className="text-secondary">
                                   <IconButton aria-label="spotify" size="large" onClick={() => connectToSpotify()}>
                                       <FontAwesomeIcon icon={faSpotify} style={{ color: 'green' }}/>
                                   </IconButton>
                               </Card.Text>
                           </Card.Body>
                       </Card>
                   </Col>
               </Row>
           </Container>
       </CustomLayout>
   )
}
