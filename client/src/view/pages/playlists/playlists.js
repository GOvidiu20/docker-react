import React, { useState} from 'react';
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
    const [data, setData] = useState([
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 2', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 3', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 3', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 4', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 5', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 6', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        // Add more data as needed
    ]);
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Author',
            selector: row => row.created_by,
        },
        {
            name: 'Added date',
            selector: row => row.data_added,
            sortable: 'true'
        },
        {
            name: 'Actions',
            cell: () => (
                <div>
                    <IconButton aria-label="delete" color="error">
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" color="primary">
                        <EditIcon/>
                    </IconButton>
                </div>
            ),
            button: true,
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

    const filteredData = data.filter((row) =>
        Object.values(row).some(
            (value) =>
                value && value.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );
    const actions = (
        <div className="d-flex">
            <Button className="mx-3" variant="contained" size="small" style={{ backgroundColor: 'white', color: 'black', borderRadius: '30px' }} startIcon={<Add />}>
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
                    <DataTable
                        title={<span style={{ color: 'white' }}>My Playlists</span>}
                        columns={columns}
                        data={filteredData}
                        fixedHeader
                        actions={actions}
                        theme="datatableTheme"
                        conditionalRowStyles={conditionalRowStyles}
                    />
                </Card>
            </Container>
        </CustomLayout>
    )
}
