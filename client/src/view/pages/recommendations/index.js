import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout";
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import './recommendation.scss';
import {forEach} from "react-bootstrap/ElementChildren";

export default function Recommendations() {

    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [topSpotifySongs, setTopSpotifySongs] = useState()

    useEffect(() => {
        // loadSongs();
        // loadPlaylists();
        loadSpotifyRecommendations();
    }, []);

    const loadSongs = async () => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/songs', {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => response.json())
                .then(data => setSongs(data))
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };
    const loadPlaylists = async () => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/playlists/user/' + localStorage.getItem('userId'), {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(respone => respone.json())
                .then(data => {
                    let newPlaylistOptions = [];
                    data.forEach((playlist) => {
                        let optionPlaylist = {
                            value: playlist.id,
                            label: playlist.title
                        }
                        newPlaylistOptions = [...newPlaylistOptions, optionPlaylist];
                    });
                    setPlaylists(newPlaylistOptions)
                })
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    async function loadSpotifyRecommendations(){
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/spotify/userTopSongs?userId=' + localStorage.getItem('userId'), {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setTopSpotifySongs(data);
                })
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    function handleSearch(value) {
        console.log(value);
    }

    return (
       <CustomLayout>
           <Container className="mt-5 container-scrollable">
               <Row className='d-flex justify-content-start'>
                   <Col xs={12} className="d-flex w-50">
                       <input type="text" className="form-control rounded mx-3" placeholder="Find vinyls by your tastes(I love/hate rock...)"
                              onChange={(e) => handleSearch(e.target.value)}/>
                       <Button>Find</Button>
                   </Col>
               </Row>
               <Row className='d-flex justify-content-center w-100 mt-3 mb-3'>
                   <hr className="h-5 text-secondary mt-2 mb-2 w-100" />
               </Row>
               <Row>
                   <h1 className="fs-3 fw-bold text-light mb-2 mx-3">Spotify Recommendations</h1>

                   {
                       topSpotifySongs &&
                       topSpotifySongs.map((song, index) => (
                       <Col key={song.id} xs={12} sm={12} md={4} lg={3} xl={2} className="mb-3">
                               <Card className="vinyl-card-recommendations">
                                   <Card.Img src={song.album.images[1].url} />
                                   <Card.Body>
                                       <Card.Title className="text-light text-cart-title">
                                           <a href={song.externalUrls.externalUrls.spotify}>
                                               {song.title.length > 15 ? song.name.slice(0, 15) + '...' : song.title}
                                           </a>
                                       </Card.Title>
                                       <Card.Text className="text-secondary text-cart-body">
                                           {
                                               song.artists.map((artist, index) => (
                                                   index === song.artists.length ? artist.name : artist.name + ', '
                                               ))
                                           }
                                       </Card.Text>
                                   </Card.Body>
                               </Card>
                       </Col>
                   ))}
               </Row>
               <Row>
               </Row>


           </Container>
       </CustomLayout>
   )
}
