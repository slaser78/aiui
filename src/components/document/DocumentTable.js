import React, {useContext, useEffect} from "react";
import Alert from '@mui/material/Alert';
import axios from "axios";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import cookie from "react-cookies";
import {DataGridPremium, GridToolbar, useGridApiContext} from "@mui/x-data-grid-premium";
import DeleteDocument from './DeleteDocument';
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import {UrlContext} from "../../context";
import useAPI from "../../useAPI";

const username = localStorage.getItem("username");

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
                        reject(new Error("Error while saving Feedback name field: field can't be empty."));
                    }else {
                        resolve({...entry});
                    }
                }, 200),
            ),
        [],
    );
};

const SelectEditInputCell = (props) => {
    const { id, value, field} = props;
    const [source,setSource] = React.useState([]);
    const apiRef = useGridApiContext();
    const urlValue = useContext(UrlContext);
    const entries = useAPI(urlValue.urlValue + `/source`);

    useEffect(() => {
        setSource(entries);
        //eslint-disable-next-line
    }, [entries,]);

    const handleChange = async (event) => {
        await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
        apiRef.current.stopCellEditMode({ id, field });
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            size="small"
            sx={{ height: 1 }}
            native
            autoFocus
        >
            let options = {source.map(sourceValue => {
            return (<option key={sourceValue.id}>{sourceValue.name}</option>)
        })}
        </Select>
    );
}

SelectEditInputCell.propTypes = {
    /**
     * The column field of the cell that triggered the event.
     */
    field: PropTypes.string.isRequired,
    /**
     * The grid row id.
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value: PropTypes.any,
};

const renderSelectEditInputCell = (params) => {
    return <SelectEditInputCell {...params} />;
};

function DocumentTable() {
    const mutateRow = useFakeMutation();
    const [data,setData] = React.useState([]);
    const urlValue = React.useContext(UrlContext);
    const entries = useAPI(urlValue.urlValue+`/getDocuments?person=${username}`);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [sortModel, setSortModel] = React.useState([{field: 'name', sort: 'asc'}]);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [source, setSource] = React.useState([])
    const entries1 = useAPI(urlValue.urlValue+"/source");

    React.useEffect(() => {
        setData(entries);
        setSource(entries1)
        //eslint-disable-next-line
    }, [entries, entries1]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(
        async (updatedRow) => {
            // Make the HTTP request to save in the backend
            new Promise((resolve) => {
                let source1 = '';
                source.map(t => (t.name === updatedRow.name) ? source1 = t.id : null)
                const body = {
                    id: updatedRow.id,
                    title: updatedRow.title,
                    sourceId: source1
                }
                axios.post(urlValue.urlValue + `/updateDocument`, body, options);
                resolve();
            }, 1000);
            const response = await mutateRow(updatedRow);
            setSnackbar({ children: 'Row successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow, urlValue.urlValue, source],
    );

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const handleDeleteRow = () => {
        setDeleteOpen(true);
    }

    const handleClose = () => {
        setDeleteOpen(false);
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
            >Document
            </Typography>
            <Button
                sx={{mb: 2}}
                disabled={selectionModel.length === 0}
                onClick={handleDeleteRow}
            >
                Delete
            </Button>
            <DataGridPremium
                checkboxSelection
                columns={[
                        {headerName: 'Title', field: 'title', width: 750},
                        {headerName: 'Source',
                            field: 'source',
                            editable: true,
                            width: 300,
                            renderEditCell: renderSelectEditInputCell}
                    ]}
                disableRowSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'username', sort: 'asc'}]
                    },
                }}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                onRowSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                onSortModelChange={(newSortModel) => {
                    setSortModel(newSortModel);
                    cookie.save('feedbackTableSortModel', newSortModel, {path: '/'});
                }}
                processRowUpdate={processRowUpdate}
                rows={data}
                selectionModel={selectionModel}
                slots = {{ toolbar: GridToolbar }}
                sortModel={sortModel}
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
    { deleteOpen ?
        <DeleteDocument
            open={deleteOpen}
            onclose={handleClose}
            setDeleteOpen={setDeleteOpen}
            selectionModel={selectionModel}
            data={data}
            setData={setData}
        /> : null}
    </>
    )
}

export default DocumentTable;