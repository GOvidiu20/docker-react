import {Button, Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import './Playlists.scss';
import {useNavigate} from "react-router";
export default function PlaylistShare() {
    const playlistId = useParams()['id'];
    const [playlist, setPlaylist] = useState();
    const [userPlaylist, setUserPlaylist] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        loadPlaylist();
    }, [playlistId]);

    async function loadPlaylist() {

        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/playlists/' + playlistId, {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => response.json())
                .then(async data => {
                    setPlaylist(data);
                    await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/user/' + data.userIds[0], {
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            setUserPlaylist(data);
                        })
                })
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    async function sharePlaylist() {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/playlists/users/' + playlist.id + '/' + localStorage.getItem('userId'), {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => response.json())
                .then(data => navigate('/playlists'))
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    return (
        <Container className="rounded bg-black text-secondary d-flex justify-content-center align-items-center mt-5 share-container">
            {
                userPlaylist && playlist
                    ?
                        playlist.userIds.includes(localStorage.getItem('userId'))
                            ? "You already have access to this playlist"
                            : <div className="text-center">
                                  <div>
                                    {userPlaylist.name + " wants to share to you this playlist: " + playlist.title}
                                  </div>
                                  <div className="mt-3">
                                      <Button className="mx-3" onClick={() => sharePlaylist()}>Approve</Button>
                                      <Button variant="danger">Decline</Button>
                                  </div>
                              </div>
                    : ''
            }
        </Container>
    )
}