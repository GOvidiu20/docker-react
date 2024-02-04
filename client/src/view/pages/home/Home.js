import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout";
import {Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import './Home.scss';
import Modal from "react-bootstrap/Modal";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {toast} from "react-toastify";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";
export default function Home() {

    const animatedComponents = makeAnimated();
    const [selectedPlaylistOption, setSelectedPlaylistOption] = useState([]);
    const [songs, setSongs] = useState([]);
    const [shownSongs, setShownSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [addSongToPlaylistModal, setAddSongToPlaylistModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    useEffect(() => {
        loadSongs();
        loadPlaylists();
    }, []);

    const loadSongs = async () => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/songs', {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setSongs(data);
                    setShownSongs(data);
                })
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

    const addSongToPlaylist = async (e) => {
        const apiUrl = process.env.REACT_APP_BACKEND_SERVER + '/api/playlists/' + selectedPlaylistOption.value + '/songs/' + selectedSong.id + '/user/' + localStorage.getItem('userId');

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            if(response.status === 200) {
                setAddSongToPlaylistModal(false)
                toast.success("Song added to playlist successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error("Update playlist failed, please try again later!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    function handleSearch(value) {
        setShownSongs(songs.filter(song =>
            song.title.toLowerCase().includes(value.toLowerCase())));
    }

    function onHideModal() {
        setAddSongToPlaylistModal(false)
        setSelectedPlaylistOption([]);
    }

    const changeOptionPlaylists = event => {
        setSelectedPlaylistOption(event);
    }

    function selectSongButton(song) {
        setAddSongToPlaylistModal(true)
        setSelectedSong(song);
        console.log(selectedSong);
    }

    return (
       <CustomLayout>
           <Container className="mt-5 container-scrollable">
               <Row className='d-flex justify-content-center'>
                   <Col xs={12} className="w-50">
                       <input type="text" className="form-control rounded" placeholder="Search your favourite vinyl..."
                              onChange={(e) => handleSearch(e.target.value)}/>
                   </Col>
               </Row>
               <Row className="mt-3">
                   {
                       shownSongs.length !== 0 ?
                           shownSongs.map((song, index) => (
                           <Col key={song.id} xs={12} sm={12} md={4} lg={3} xl={2} className="mb-3 d-flex">
                               <Card className="vinyl-cart" onClick={() => selectSongButton(song)}>
                                   <Card.Img src={song.discogs_image} />
                                   <Card.Body typeof="mo:Track">
                                       <Card.Title className="text-light text-cart-title">
                                           <a property="foaf:url" href={song.discogs}>
                                               <span property="dc:title">
                                                   {song.vinylLabel.length > 15 ? song.vinylLabel.slice(0, 15) + '...' : song.vinylLabel}
                                               </span>
                                           </a>
                                       </Card.Title>
                                       <Card.Text typeof="mo:MusicGroup" className="text-secondary text-cart-body">
                                           <div property="foaf:name">
                                               {song.creator}
                                           </div>
                                           <div property="dc:genre">
                                               {song.genre}
                                           </div>
                                       </Card.Text>
                                   </Card.Body>
                               </Card>
                           </Col>
                   ))
                       : <p className="text-secondary">No vinyls found</p>
                   }
               </Row>
               <Modal
                   show={addSongToPlaylistModal}
                   onHide={() => onHideModal()}
                   centered
               >
                   <Modal.Header className="modal-change-name-header">
                       <Modal.Title>
                           <div className="fs-4 fw-semibold text-light">{selectedSong && selectedSong.vinylLabel}</div>
                           <div className="fs-5 fw-light text-secondary">{selectedSong && selectedSong.creator}</div>
                       </Modal.Title>
                   </Modal.Header>
                   <Modal.Body className="modal-change-name-body">
                       <Row className="w-100 h-100">
                           <Col xs={4}>
                               <img src={selectedSong && selectedSong.discogs_image} />
                           </Col>
                           <Col xs={8}>
                               <Form.Group className="mb-3 text-light" controlId="title">
                                   <Form.Label>Add Song to your playlists</Form.Label>
                                   <Select
                                       className="text-dark"
                                       closeMenuOnSelect={true}
                                       components={animatedComponents}
                                       //isMulti
                                       options={playlists}
                                       onChange={changeOptionPlaylists}
                                   />
                                   {/*{errorNewNamePlaylist && <div className="text-danger">Name is required</div>}*/}
                               </Form.Group>
                           </Col>
                       </Row>

                   </Modal.Body>
                   <Modal.Footer className="modal-change-name-footer">
                       <Button variant_type='primary' onClick={addSongToPlaylist}> Save </Button>
                   </Modal.Footer>
               </Modal>
           </Container>
       </CustomLayout>
   )
}
