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
export default function Playlists() {
    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState();
    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        try {
            await fetch(process.env.REACT_APP_BACKEND_SERVER + '/api/playlists/user/' + sessionStorage.getItem('userId'), {
                headers: new Headers({
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }),
            })
                .then(respone => respone.json())
                .then(data => setPlaylists(data))
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Author',
            selector: row => row.createdById,
        },
        {
            name: 'Added date',
            selector: row => row.category,
            sortable: 'true'
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <IconButton aria-label="delete" color="error">
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" color="primary" onClick={() => navigate(`/playlists/${row.id}/edit`)}>
                        <EditIcon/>
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
