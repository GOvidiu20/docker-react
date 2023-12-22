import React, {useState} from 'react';
import CustomLayout from "../../components/Layout";
import {Container, Row, Col, Card} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import DataTable from "react-data-table-component";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function PlaylistChange() {

    const [songs, setSongs] = useState();
    const id = useParams()['id'];

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
            name: 'Actions',
            cell: (row) => (
                <div>
                    <IconButton aria-label="delete" color="error">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            ),
            button: true,
        },
    ];

    function handleSearch(value) {
        console.log(value);
    }

    return (
        <CustomLayout>
            <Container className="mt-5">
                <Row className='d-flex justify-content-center'>
                    <Col xs={12} className="w-50 text-center text-success">
                        {
                            id ? <h3> Edit Playlist {id}</h3> : <h3>Create Playlist</h3>
                        }
                    </Col>
                </Row>
                <Row className="mt-5 container-scrollable">
                    <Col xs={8}>
                        <Card className="container-scrollable-playlists border-0">
                            { songs &&
                                <DataTable
                                    title={<span style={{ color: 'white' }}>My Playlists</span>}
                                    columns={columns}
                                    data={songs}
                                    fixedHeader
                                    theme="datatableTheme"
                                    conditionalRowStyles={conditionalRowStyles}
                                />
                            }
                        </Card>
                    </Col>
                    <Col xs={4} className="px-auto">
                        <input type="text" className="form-control rounded w-75" placeholder="Search vinyl for playlist..."
                               onChange={(e) => handleSearch(e.target.value)}/>
                    </Col>
                </Row>
            </Container>
        </CustomLayout>
    )
}
