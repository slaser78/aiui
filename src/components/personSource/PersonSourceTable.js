import React from "react";
import {UrlContext} from "../../context";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import useAPI from "../../useAPI";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddPersonSource from './AddPersonSource';
import AddSourcePerson from './AddSourcePerson';
import DeletePersonSource from './DeletePersonSource';

function PersonSourceTable() {
    const [data,setData] = React.useState([]);
    const urlValue = React.useContext(UrlContext);
    const entries = useAPI(urlValue.urlValue + `/personSource`);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [addPersonSourceOpen, setAddPersonSourceOpen] = React.useState(false);
    const [addSourcePersonOpen, setAddSourcePersonOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    React.useEffect(() => {
        setData(entries)
        //eslint-disable-next-line
    }, [entries]);

    const handleDeleteRow = () => {
        setDeleteOpen(true);
    }

    const handleAddPersonSource = () => {
        setAddPersonSourceOpen(true);
    }

    const handleAddSourcePerson = () => {
        setAddSourcePersonOpen(true);
    }

    const handleClose = () => {
        setDeleteOpen(false);
        setAddPersonSourceOpen(false);
        setAddSourcePersonOpen(false);
    }

    return(
        <>
            <Container sx={{ height: '1000px', width: '100%', m: 2 }}>
            <br />
            <br />
            <Typography
                variant='h4'
                component='h4'
                sx={{textAlign:'center', mt:3, mb:3}}
            >Person Source
            </Typography>
            <Button
                sx={{mb: 2}}
                disabled={rowSelectionModel.length !== 1}
                onClick={handleAddPersonSource}
            >
                Add Person to Source
            </Button>
                <Button
                    sx={{mb: 2}}
                    disabled={rowSelectionModel.length !== 1}
                    onClick={handleAddSourcePerson}
                >
                    Add Source to Person
                </Button>
            <Button
                sx={{mb: 2}}
                disabled={rowSelectionModel.length === 0}
                onClick={handleDeleteRow}
            >
                Delete
            </Button>
            <DataGridPremium
                checkboxSelection
                columns={[
                    {headerName: 'Person', field: 'person', width: 200,},
                    {headerName: 'Source', field: 'source', width: 200}
                ]}
                disableRowSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'source', sort: 'asc'}]
                    },
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rows={data}
                rowSelectionModel={rowSelectionModel}
                slots = {{ toolbar: GridToolbar }}
            />
        </Container>
            { addPersonSourceOpen ?
                <AddPersonSource
                    open={addPersonSourceOpen}
                    onclose={handleClose}
                    setAddPersonSourceOpen={setAddPersonSourceOpen}
                    data={data}
                    setData={setData}
                /> : null}
            { addSourcePersonOpen ?
                <AddSourcePerson
                    open={addSourcePersonOpen}
                    onclose={handleClose}
                    setAddSourcePersonOpen={setAddSourcePersonOpen}
                    data={data}
                    setData={setData}
                /> : null}
            { deleteOpen ?
                <DeletePersonSource
                    open={deleteOpen}
                    onclose={handleClose}
                    setDeleteOpen={setDeleteOpen}
                    rowSelectionModel={rowSelectionModel}
                    data={data}
                    setData={setData}
                /> : null}
        </>
    )
}
export default PersonSourceTable