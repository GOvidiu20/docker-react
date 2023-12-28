import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout";
import {Container, Row, Col, Card} from 'react-bootstrap';
import './profile.scss';

export default function Profile() {

    const [user, setUser] = useState();
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/user/' + sessionStorage.getItem('userId'), {
                headers: new Headers({
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }),
            })
                .then(response => response.json())
                .then(data => {setUser(data);console.log(data)})
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
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
                                   SPOTIFY
                               </Card.Text>
                           </Card.Body>
                       </Card>
                   </Col>
               </Row>
           </Container>
       </CustomLayout>
   )
}
