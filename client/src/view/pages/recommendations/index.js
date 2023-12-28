import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout";
import {Container, Row, Col} from 'react-bootstrap';
import './recommendation.scss';

export default function Recommendations() {

    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        loadSongs();
        loadPlaylists();
    }, []);

    const loadSongs = async () => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/songs', {
                headers: new Headers({
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
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
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/playlists/user/' + sessionStorage.getItem('userId'), {
                headers: new Headers({
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
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

    function handleSearch(value) {
        console.log(value);
    }

    return (
       <CustomLayout>
           <Container className="mt-5">
               <Row className='d-flex justify-content-center'>
                   <Col xs={12} className="w-50">
                       <input type="text" className="form-control rounded" placeholder="Find vinyls by your tastes(I love/hate rock...)"
                              onChange={(e) => handleSearch(e.target.value)}/>
                   </Col>
               </Row>
               <Row className="mt-5 container-scrollable">
                   {/*{songs.map((song, index) => (*/}
                   {/*    <Col key={song.id} xs={12} sm={12} md={4} lg={3} xl={2} className="mb-3">*/}
                   {/*            <Card className="vinyl-cart">*/}
                   {/*                <Card.Img src="https://newjams-images.scdn.co/image/ab67647800003f8a/dt/v3/release-radar/ab6761610000e5eb6cab9e007b77913d63f12835/en" />*/}
                   {/*                <Card.Body>*/}
                   {/*                    <Card.Title className="text-light text-cart-title">*/}
                   {/*                        {song.title.length > 15 ? song.title.slice(0, 15) + '...' : song.title}*/}
                   {/*                    </Card.Title>*/}
                   {/*                    <Card.Text className="text-secondary text-cart-body">*/}
                   {/*                        Author*/}
                   {/*                    </Card.Text>*/}
                   {/*                </Card.Body>*/}
                   {/*            </Card>*/}
                   {/*    </Col>*/}
                   {/*))}*/}
               </Row>
           </Container>
       </CustomLayout>
   )
}
