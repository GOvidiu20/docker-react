import React, {useMemo, useState} from 'react';
import CustomLayout from "../../components/Layout";
import { Container, Row, Card, Button} from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import './Playlists.scss';
export default function Playlists() {
    const [data, setData] = useState([
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
        { id: 1, title: 'Song 1', created_by: 'Author1', data_added: '11.08.2023' },
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
        },
    ];
    createTheme('datatableTheme', {
        text: {
            primary: '#838383',
            secondary: '#2aa198',
        },
        background: {
            default: '#1fc85a',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: 'rgba(255,255,255,.12)',
        },
        button: {
            default: '#2aa198',
            hover: 'rgba(0,0,0,.08)',
            focus: 'rgba(255,255,255,.12)',
            disabled: 'rgba(255, 255, 255, .34)',
        },
    });
    const conditionalRowStyles = [
        {
            when: row => row.id != null,
            style: {
                borderBottom: 'none',
                color: 'black',
            },
        },
    ];
    return (
        <CustomLayout>
            <Container className="mt-5">
                <Card className="container-scrollable border-0">
                        <DataTable
                            title="Movie List"
                            columns={columns}
                            data={data}
                            fixedHeader
                            theme="datatableTheme"
                            conditionalRowStyles={conditionalRowStyles}
                        />
                </Card>
            </Container>
        </CustomLayout>
    )
}
