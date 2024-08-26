import React from "react";
import {UrlContext} from "../../context";
import axios from "axios";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import useAPI from "../../useAPI";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import AddSource from './AddSource';
import AddDocument from './AddDocument';
import DeleteSource from './DeleteSource';
const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        
    }
};
const useFakeMutation = () => {
    return React.useCallback(
        (entry) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    if (entry.name?.trim() === '') {
                        reject(new Error("Error while saving AOR field: field can't be empty."));
                    } else if (entry.isse?.trim() === '') {
                        reject(new Error("Error while saving AOR field: field can't be empty."));
                    } else {
                        resolve({...entry});
                    }
                }, 200),
            ),
        [],
    );
};

function SourceTable() {
    const mutateRow = useFakeMutation();
    const [data,setData] = React.useState([]);
    const urlValue = React.useContext(UrlContext);
    const entries = useAPI(urlValue.urlValue + `/source`);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [addOpen, setAddOpen] = React.useState(false);
    const [addDocOpen, setAddDocOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    

    React.useEffect(() => {
        setData(entries)
        //eslint-disable-next-line
    }, [entries]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        async (updatedRow) => {
            new Promise((resolve) => {
                axios.put(urlValue.urlValue + `/source/${updatedRow.id}`, updatedRow, options);
                resolve();
            }, 1000);
            const response = await mutateRow(updatedRow);
            setSnackbar({ children: 'Row successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow, urlValue.urlValue],
    );

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const handleDeleteRow = () => {
        setDeleteOpen(true);
    }

    const handleAddRow = () => {
        setAddOpen(true);
    }

    const handleAddDocRow = () => {
        setAddDocOpen(true);
    }

    const handleClose = () => {
        setDeleteOpen(false);
        setAddOpen(false);
        setAddDocOpen(false);
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
            >Source
            </Typography>
            <Button
                sx={{mb: 2}}
                onClick={handleAddRow}
            >
                Add
            </Button>
            <Button
                sx={{mb: 2}}
                disabled={selectionModel.length === 0}
                onClick={handleDeleteRow}
            >
                Delete
            </Button>
            <Button
                sx={{mb: 2}}
                disabled={selectionModel.length !== 1}
                onClick={handleAddDocRow}
            >
                Document
            </Button>
            <DataGridPremium
                checkboxSelection
                columns={[
                        {headerName: 'Name', field: 'name', width: 200, editable: true},
                        {headerName: 'Description', field: 'description', editable: true, width: 400},
                        {headerName: 'Enabled', field: 'enabled', type: "boolean", editable: true},
                        {headerName: 'Public', field: 'public1', type: "boolean", editable: true}
                        ]}
                disableRowSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'name', sort: 'asc'}]
                    },
                }}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                onRowSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                processRowUpdate={processRowUpdate}
                rows={data}
                selectionModel={selectionModel}
                slots = {{ toolbar: GridToolbar }}
            />
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </Container>
            { addOpen ?
                <AddSource
                    open={addOpen}
                    onclose={handleClose}
                    setAddOpen={setAddOpen}
                    data={data}
                    setData={setData}
                /> : null}
            { deleteOpen ?
                <DeleteSource
                    open={deleteOpen}
                    onclose={handleClose}
                    setDeleteOpen={setDeleteOpen}
                    selectionModel={selectionModel}
                    data={data}
                    setData={setData}
                /> : null}
            { addDocOpen ?
                <AddDocument
                    open={addDocOpen}
                    onclose={handleClose}
                    setAddDocOpen={setAddDocOpen}
                    data={data}
                /> : null}
        </>
    )
}
export default SourceTable