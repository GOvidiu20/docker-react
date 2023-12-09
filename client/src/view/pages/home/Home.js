import React from 'react';
import CustomLayout from "../../components/Layout";
import { Container, Row, Col, Card} from 'react-bootstrap';
import './Home.scss';
export default function Home() {

   function handleSearch(value) {
       console.log(value);
   }
   const items = Array.from({ length: 90 }, (_, index) => `Item ${index + 1}`);

   return (
       <CustomLayout>
           <Container className="mt-5">
               <Row className='d-flex justify-content-center'>
                   <Col xs={12} className="w-50">
                       <input type="text" className="form-control rounded" placeholder="Search your favourite vinyl..."
                              onChange={(e) => handleSearch(e.target.value)}/>
                   </Col>
               </Row>
               <Row className="mt-5 container-scrollable" >
                   {items.map((item, index) => (
                       <Col key={index} md={2} lg={2} className="mb-3">
                           <Card className="vinyl-cart">
                               <Card.Img src="https://newjams-images.scdn.co/image/ab67647800003f8a/dt/v3/release-radar/ab6761610000e5eb6cab9e007b77913d63f12835/en" />
                               <Card.Body>
                                   <Card.Title className="text-light">{"Song"+index}</Card.Title>
                                   <Card.Text className="text-secondary">Author</Card.Text>
                               </Card.Body>
                           </Card>
                       </Col>
                   ))}
               </Row>
           </Container>
       </CustomLayout>
   )
}
