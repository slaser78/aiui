import React from "react";
import {UrlContext} from "../../context";
import {DataGridPremium, GridToolbar} from "@mui/x-data-grid-premium";
import useAPI from "../../useAPI";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddPersonSource from './AddPersonSource';
import DeletePersonSource from './DeletePersonSource';
import cookie from "react-cookies";

function PersonSourceTable() {
    const [data,setData] = React.useState([]);
    const urlValue = React.useContext(UrlContext);
    const entries = useAPI(urlValue.urlValue + `/personSource`);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [addOpen, setAddOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [sortModel, setSortModel] = React.useState([{field: 'person', sort: 'asc'}]);

    React.useEffect(() => {
        setData(entries)
        setSortModel(cookie.load('assetTableSortModel'));
        //eslint-disable-next-line
    }, [entries]);

    const handleDeleteRow = () => {
        setDeleteOpen(true);
    }

    const handleAddOpen = () => {
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
            >Person Source
            </Typography>
            <Button
                sx={{mb: 2}}
                onClick={handleAddOpen}
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
                    {headerName: 'Person', field: 'person', width: 200,},
                    {headerName: 'Source', field: 'source', width: 200}
                ]}
                disableRowSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                onSortModelChange={(newSortModel) => {
                    setSortModel(newSortModel);
                    cookie.save('personSourceTableSortModel', newSortModel, {path: '/'});
                }}
                rows={data}
                rowSelectionModel={rowSelectionModel}
                slots = {{ toolbar: GridToolbar }}
                sortModel={sortModel}
            />
        </Container>
            { addOpen ?
                <AddPersonSource
                    open={addOpen}
                    onclose={handleClose}
                    setAddOpen={setAddOpen}
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