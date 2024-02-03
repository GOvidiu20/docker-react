import {Card, Col} from "react-bootstrap";
import React from "react";

function DisplayVinyl(props) {
    const song = props.song;
    return (
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3 d-flex">
            <Card className="vinyl-card-recommendations">
                <Card.Img src={song.discogs_image} />
                <Card.Body typeof="mo:Track">
                    <Card.Title className="text-light text-cart-title">
                        <a property="dc:url" href={song.discogs}>
                            <span property="dc:title">{song.vinylLabel}</span>
                        </a>
                    </Card.Title>
                    <Card.Text typeof="mo:MusicGroup" className="text-secondary text-cart-body">
                        <div property="foaf:name">{song.creator}</div>
                        <div property="mo:genre">{song.genre}</div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default DisplayVinyl;