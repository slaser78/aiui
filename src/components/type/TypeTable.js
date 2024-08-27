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
import AddType from './AddType';
import DeleteType from './DeleteType';

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

function TypeTable() {
    const mutateRow = useFakeMutation();
    const [data,setData] = React.useState([]);
    const urlValue = React.useContext(UrlContext);
    const entries = useAPI(urlValue.urlValue + `/type1`);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [addOpen, setAddOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    React.useEffect(() => {
        setData(entries)
        //eslint-disable-next-line
    }, [entries]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        async (updatedRow) => {
            // Make the HTTP request to save in the backend
            new Promise((resolve) => {
                axios.put(urlValue.urlValue + `/role/${updatedRow.id}`, updatedRow, options);
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

    const handleClose = () => {
        setDeleteOpen(false);
        setAddOpen(false);
    }

    return(
        <>
        <Container sx={{ height: '650px', width: '500px', m: 2 }}>
            <br />
            <br />
            <Typography
                variant='h4'
                component='h4'
                sx={{textAlign:'center', mt:3, mb:3}}
            >Type
            </Typography>
            <Button
                sx={{mb: 2}}
                onClick={handleAddRow}
            >
                Add
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
                        {headerName: 'Type', field: 'type1', width: 200, editable: true}
                        ]}
                disableRowSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'authority', sort: 'asc'}]
                    },
                }}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                processRowUpdate={processRowUpdate}
                rows={data}
                rowSelectionModel={rowSelectionModel}
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
                <AddType
                    open={addOpen}
                    onclose={handleClose}
                    setAddOpen={setAddOpen}
                    data={data}
                    setData={setData}
                /> : null}
            { deleteOpen ?
                <DeleteType
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
export default TypeTable