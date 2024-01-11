import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout";
import {Container, Row, Col, Button, Card, Tab, Tabs} from 'react-bootstrap';
import './recommendation.scss';

export default function Recommendations() {

    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [topSpotifySongs, setTopSpotifySongs] = useState([])
    const [topSpotifyArtists, setTopSpotifyArtists] = useState([])
    const [spotifySavedAlbums, setSpotifySavedAlbums] = useState([])

    useEffect(() => {
        // loadSongs();
        // loadPlaylists();
        loadSpotifySavedAlbums();
        loadTopSpotifyArtists();
        loadTopSpotifySongs();
        verifyUserTokenAvailability();
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

    async function loadTopSpotifySongs(){
        try {
                await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/spotify/userTopSongs?userId=' + localStorage.getItem('userId'), {
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if(data.length !== 0) {
                            setTopSpotifySongs(data);
                            localStorage.setItem("songs", JSON.stringify(data));
                        }
                        else {
                            setTopSpotifySongs(JSON.parse(localStorage.getItem('songs')));
                        }
                    })
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    async function loadTopSpotifyArtists(){
        try {
                await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/spotify/userTopArtists?userId=' + localStorage.getItem('userId'), {
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if(data.length !== 0) {
                            setTopSpotifyArtists(data);
                            localStorage.setItem("artists", JSON.stringify(data));
                        }
                        else
                            setTopSpotifyArtists(JSON.parse(localStorage.getItem('artists')));
                    })
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    async function loadSpotifySavedAlbums(){
        try {
                await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/spotify/userSavedAlbum?userId=' + localStorage.getItem('userId'), {
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if(data.length !== 0) {
                            setSpotifySavedAlbums(data);
                            localStorage.setItem("albums", JSON.stringify(data));
                        }
                        else
                            setSpotifySavedAlbums(localStorage.getItem('albums'));
                    })
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    async function verifyUserTokenAvailability(){
        try {
                await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/spotify/verify?userId=' + localStorage.getItem('userId'), {
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
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
           <Container className="mt-3 container-scrollable-recommender">
               <Tabs
                   defaultActiveKey="preferences"
                   id="justify-tab-example"
                   className="mb-4 recommendation-tab"
                   variant="underline"
               >
                   <Tab eventKey="preferences" title="Your Preferences">
                       <Row className='d-flex justify-content-center'>
                           <Col xs={12} className="d-flex w-50">
                               <input type="text" className="form-control rounded mx-3" placeholder="Find vinyls by your tastes(I love/hate rock...)"
                                      onChange={(e) => handleSearch(e.target.value)}/>
                               <Button>Find</Button>
                           </Col>
                       </Row>
                   </Tab>
                   <Tab eventKey="profile" title="Spotify Recommendations">
                       <h1 className="fs-3 fw-bold text-light mb-2 mx-3">Favorites songs</h1>

                       <Row>
                           {
                               topSpotifySongs &&
                               topSpotifySongs.map((song, index) => (
                                   <Col key={song.id} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3 d-flex">
                                       <Card className="vinyl-card-recommendations">
                                           <Card.Img src={song.album.images[1].url} />
                                           <Card.Body>
                                               <Card.Title className="text-light text-cart-title">
                                                   <a href={song.externalUrls.externalUrls.spotify}>
                                                       {song.name}
                                                   </a>
                                               </Card.Title>
                                               <Card.Text className="text-secondary text-cart-body">
                                                   {
                                                       song.artists.map((artist, index) => (
                                                           index === song.artists.length - 1 ? artist.name : artist.name + ', '
                                                       ))
                                                   }
                                               </Card.Text>
                                           </Card.Body>
                                       </Card>
                                   </Col>
                               ))}
                       </Row>
                       <Row className='d-flex justify-content-center w-100 mt-3 mb-3'>
                           <hr className="h-5 text-secondary mt-2 mb-1 w-100" />
                       </Row>
                       <h1 className="fs-3 fw-bold text-light mb-3 mx-3">Favorites artists</h1>
                       <Row>
                           {
                               topSpotifyArtists &&
                               topSpotifyArtists.map((artist, index) => (
                                   <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3 d-flex">
                                       <Card className="vinyl-card-recommendations">
                                           <Card.Img src={artist.images[1].url} />
                                           <Card.Body>
                                               <Card.Title className="text-light text-cart-title">
                                                   <a href={artist.externalUrls.externalUrls.spotify}>
                                                       {artist.name}
                                                   </a>
                                               </Card.Title>
                                               <Card.Text className="text-secondary text-cart-body">
                                                   {
                                                       artist.genres.map((genres, index) => (
                                                           index === artist.genres.length - 1 ? genres : genres + ', '
                                                       ))
                                                   }
                                               </Card.Text>
                                           </Card.Body>
                                       </Card>
                                   </Col>
                               ))}
                       </Row>
                   </Tab>
                   <Tab eventKey="spotify-preferences" title="Recommendations">
                       Tab content for Loooonger Tab
                   </Tab>
               </Tabs>
           </Container>
       </CustomLayout>
   )
}
