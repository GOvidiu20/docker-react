import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout";
import {Container, Row, Col, Card} from 'react-bootstrap';
import './profile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import IconButton from "@mui/material/IconButton";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {toast} from "react-toastify";

export default function Profile() {

    const [user, setUser] = useState();

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
                        toast.success("Song added to playlist successfully!", {
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
                                   <div>
                                       {user && "Name: " + user.name }
                                   </div>
                                   <div>
                                       {user && "Email: " + user.email }
                                   </div>
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
