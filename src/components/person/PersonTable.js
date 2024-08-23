import AddPerson from './AddPerson';
import Alert from '@mui/material/Alert';
import axios from "axios";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import cookie from "react-cookies";
import {DataGridPremium, GridToolbar, useGridApiContext} from "@mui/x-data-grid-premium";
import DeletePerson from './DeletePerson';
import PropTypes from "prop-types";
import React, {useContext, useEffect} from "react";
import Select from "@mui/material/Select";
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import {UrlContext} from "../../context";
import useAPI from "../../useAPI";

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
                        reject(new Error("Error while saving Person name field: field can't be empty."));
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
    const [roles,setRoles] = React.useState([]);
    const apiRef = useGridApiContext();
    const urlValue = useContext(UrlContext);
    const entries = useAPI(urlValue.urlValue + "/role");

    useEffect(() => {
        setRoles(entries);
        //eslint-disable-next-line
    }, [entries]);

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
            let options = {roles.map(roleValue => {
            return (<option key={roleValue.id}>{roleValue.role}</option>)
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

function PersonTable() {
    const mutateRow = useFakeMutation();
    const [data,setData] = React.useState([]);
    const urlValue = React.useContext(UrlContext);
    const entries = useAPI(urlValue.urlValue+"/person");
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [sortModel, setSortModel] = React.useState([{field: 'username', sort: 'asc'}]);
    const [addOpen, setAddOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [roles, setRoles] = React.useState([]);
    const entries1 = useAPI(urlValue.urlValue+"/role");

    React.useEffect(() => {
        setData(entries);
        setRoles(entries1)
        //eslint-disable-next-line
    }, [entries, entries1]);

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const processRowUpdate = React.useCallback(

        async (updatedRow) => {
            // Make the HTTP request to save in the backend
            new Promise((resolve) => {
                let role1 = '';
                roles.map(t => (t.role === updatedRow.role) ? role1 = t.id : null)
                const body = {
                    id: updatedRow.id,
                    role: role1,
                    name: updatedRow.name
                }
                axios.put(urlValue.urlValue + `/person/${updatedRow.id}`, body, options);
                resolve();
            }, 1000);
            const response = await mutateRow(updatedRow);
            setSnackbar({ children: 'Row successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow, urlValue.urlValue, roles],
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
        <Container sx={{ height: '1000px', width: '100%', m: 2 }}>
            <br />
            <br />
            <Typography
                variant='h4'
                component='h4'
                sx={{textAlign:'center', mt:3, mb:3}}
            >Person
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
                        {headerName: 'Name', field: 'name', editable: true, width: 150},
                        {headerName: 'Role', field: 'role', width: 150, renderEditCell: renderSelectEditInputCell, editable:true}
                    ]}
                disableRowSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'username', sort: 'asc'}]
                    },
                }}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                onSortModelChange={(newSortModel) => {
                    setSortModel(newSortModel);
                    cookie.save('personTableSortModel', newSortModel, {path: '/'});
                }}
                processRowUpdate={processRowUpdate}
                rows={data}
                rowSelectionModel={rowSelectionModel}
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
            { addOpen ?
                <AddPerson
                    open={addOpen}
                    onclose={handleClose}
                    setAddOpen={setAddOpen}
                    data={data}
                    setData={setData}
                /> : null}
            { deleteOpen ?
                <DeletePerson
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

export default PersonTable;