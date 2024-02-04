import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router";
import CustomLayout from "../../components/Layout";
import { Container, Card} from 'react-bootstrap';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable, { createTheme } from 'react-data-table-component';
import './Playlists.scss';
import 'react-toastify/dist/ReactToastify.css';
import Moment from "moment/moment";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Share} from "@mui/icons-material";

export default function Playlists() {
    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/playlists/user/' + localStorage.getItem('userId'), {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(respone => respone.json())
                .then(data => {setPlaylists(data);console.log(data);})
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    const deletePlaylist = async (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/playlists/' + id + '/' + localStorage.getItem('userId'), {
                        method: 'DELETE',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        }),
                    })
                        .then(response => {
                            if (response.status === 200) {
                                setPlaylists(playlists.filter(playlist => playlist.id !== id))
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Playlist has been deleted.",
                                    icon: "success"
                                });
                            } else
                                Swal.fire({
                                    title: "Error!",
                                    text: "Error when deleting the playlist.",
                                    icon: "error"
                                });
                        })
                } catch (error) {
                    console.error('Error fetching playlists:', error);
                }
            }
        });
    }

    async function sharePlaylist(playlistId) {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/user/' + localStorage.getItem('userId') + '/share-playlist/' + playlistId, {
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }),
            })
                .then(response => response.text())
                .then(data => {
                    let link = process.env.REACT_APP_FRONTEND + '/playlists/' + playlistId + '/share'
                    Swal.fire({
                        title: "Send this link to the person you wanna share this playlist",
                        html: '<a type="button">' + link + '</a>',
                        showConfirmButton: false,
                    });
                })
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Author',
            selector: row => row.username,
        },
        {
            name: 'Added date',
            selector: row => new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(row.createdDate)),
            sortable: 'true'
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <IconButton aria-label="delete" color="error" onClick={() => deletePlaylist(row.id)}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="edit" color="primary" onClick={() => navigate(`/playlists/${row.id}/edit`)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="share" color="primary" onClick={() => sharePlaylist(row.id)}>
                        <Share/>
                    </IconButton>
                </div>
            ),
        },
    ];
    createTheme('datatableTheme', {
        text: {
            primary: '#838383',
            secondary: '#2aa198',
        },
        background: {
            default: '#212121',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: 'rgba(255,255,255,.12)',
        },
    });
    const conditionalRowStyles = [
        {
            when: row => row.id != null,
            style: {
                borderBottom: 'none',
                color: 'white',
                fontSize: '15px',
                fontFamily: 'Franie Geometric Sans Family'
            },
        },
        {
            when: row => row.id == null,
            style: {
                color: '#a1a1a1',
                fontSize: '15px',
                fontFamily: 'Franie Geometric Sans Family'
            },
        },
    ];
    const [filterText, setFilterText] = useState('');

    const filteredData = playlists && playlists.filter((row) =>
        Object.values(row).some(
            (value) =>
                value && value.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );
    const actions = (
        <div className="d-flex">
            <Button className="mx-3" variant="contained" size="small" style={{ backgroundColor: 'white', color: 'black', borderRadius: '30px' }} startIcon={<Add />} onClick={() => navigate(`/playlists/create`)}>
                Add Playlist
            </Button>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, background: '#242424',borderRadius: '30px','&:focus-within': {border: '2px solid white',},}}
            >
                <IconButton sx={{ p: '10px', color: 'white' }}>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, color:'#838383' }}
                    placeholder="Search playlist..."
                    inputProps={{ 'aria-label': 'Search playlist...' }}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </Paper>
        </div>
    );

    return (
        <CustomLayout>
            <Container>
                <Card className="container-scrollable-playlists border-0">
                    { filteredData &&
                    <DataTable
                        title={<span style={{ color: 'white' }}>My Playlists</span>}
                        columns={columns}
                        data={filteredData}
                        fixedHeader
                        actions={actions}
                        theme="datatableTheme"
                        conditionalRowStyles={conditionalRowStyles}
                    />
                    }
                </Card>
            </Container>
        </CustomLayout>
    )
}
