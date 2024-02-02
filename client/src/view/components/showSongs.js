import {Card, Col} from "react-bootstrap";
import React from "react";

function DisplayVinyl(props) {
    const song = props.song;
    return (
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3 d-flex">
            <Card className="vinyl-card-recommendations">
                <Card.Img src={song.discogs_image} />
                <Card.Body property="track">
                    <Card.Title className="text-light text-cart-title">
                        <a property="url" href={song.discogs}>
                            <span property="title">{song.vinylLabel}</span>
                        </a>
                    </Card.Title>
                    <Card.Text className="text-secondary text-cart-body">
                        <span property="name">{song.creator}</span>
                        <span property="genre">{song.genre}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default DisplayVinyl;