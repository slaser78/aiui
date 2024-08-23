import React from "react";
import AddFeedback from './AddFeedback';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import cookie from "react-cookies";
import {DataGridPremium, GridToolbar, useGridApiContext} from "@mui/x-data-grid-premium";
import ResponseFeedback from './ResponseFeedback';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import {UrlContext} from "../../context";
import useAPI from "../../useAPI";
import {Grid, Stack} from "@mui/material";
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import InputBase from '@mui/material/InputBase';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
                    if (entry.vulnerability?.trim() === '') {
                        reject(new Error("Error while saving Patch Mitigation field: field can't be empty."));
                    } else {
                        resolve({...entry});
                    }
                }, 200),
            ),
        [],
    );
};

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

function DetailPanelContent({ row: rowProp }) {
    return (
        <Stack
            sx={{py: 2, height: '100%', boxSizing: 'border-box'}}
            direction="column"
        >
            <Paper sx={{flex: 1, mx: 'auto', width: '90%', p: 1}}>
                <Stack direction="column" spacing={1} sx={{height: 1}}>
                    <Grid container>
                        <Grid item md={6}>
                            <Typography variant="body1">Response: {rowProp.response}</Typography>
                            <br/>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>
        </Stack>
    );
}

const EditTextarea = (props) => {
    const { id, field, value, colDef } = props;
    const [valueState, setValueState] = React.useState(value);
    const [anchorEl, setAnchorEl] = React.useState();
    const apiRef = useGridApiContext();

    const handleRef = React.useCallback((el) => {
        setAnchorEl(el);
    }, []);

    const handleChange = React.useCallback(
        (event) => {
            const newValue = event.target.value;
            setValueState(newValue);
            apiRef.current.setEditCellValue(
                { id, field, value: newValue, debounceMs: 200 },
                event,
            );
        },
        [apiRef, field, id],
    );

    const handleKeyDown = React.useCallback(
        (event) => {
            if (
                event.key === 'Escape' ||
                (event.key === 'Enter' &&
                    !event.shiftKey &&
                    (event.ctrlKey || event.metaKey))
            ) {
                const params = apiRef.current.getCellParams(id, field);
                apiRef.current.publishEvent('cellKeyDown', params, event);
            }
        },
        [apiRef, id, field],
    );

    return (
        <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
            <div
                ref={handleRef}
                style={{
                    height: 1,
                    width: colDef.computedWidth,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            {anchorEl && (
                <Popper open anchorEl={anchorEl} placement="bottom-start">
                    <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth }}>
                        <InputBase
                            multiline
                            rows={4}
                            value={valueState}
                            sx={{ textarea: { resize: 'both' }, width: '100%' }}
                            onChange={handleChange}
                            autoFocus
                            onKeyDown={handleKeyDown}
                        />
                    </Paper>
                </Popper>
            )}
        </div>
    );
};

EditTextarea.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
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
    value: PropTypes.string,
};

const multilineColumn = {
    type: 'string',
    renderEditCell: (params) => <EditTextarea {...params} />,
};


const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: '100%',
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width, offsetLeft: -17 }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value.
     * If the column has `valueGetter`, use `params.row` to directly access the fields.
     */
    value: PropTypes.string,
};

function FeedbackTable() {

    const [data,setData] = React.useState([]);
    const urlValue = React.useContext(UrlContext);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const entries = useAPI(urlValue.urlValue+"/feedback");
    const [sortModel, setSortModel] = React.useState([{field: 'topic', sort: 'asc'}]);
    const [addOpen, setAddOpen] = React.useState(false);
    const mutateRow = useFakeMutation();
    const [responseOpen, setResponseOpen] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);
    const getDetailPanelContent = React.useCallback(
        ({ row }) => <DetailPanelContent row={row} />,
        [],
    );

    React.useEffect(() => {
        setData(entries);
        //eslint-disable-next-line
    }, [entries]);

    const processRowUpdate = React.useCallback(
        async (updatedRow) => {
            const body = {
                id: updatedRow.id,
                comment: updatedRow.comment
            }
            // Make the HTTP request to save in the backend
            new Promise((resolve) => {
                axios.put(urlValue.urlValue + `/feedback/${updatedRow.id}`, body, options);
                resolve();
            }, 1000);
            updatedRow.status = "Updated";
            const response = await mutateRow(updatedRow);
            setSnackbar({ children: 'Row successfully saved', severity: 'success' });
            return response;
        },
        [mutateRow, urlValue.urlValue],
    );

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const handleAddRow = () => {
        setAddOpen(true);
    }

    const handleResponseRow = () => {
        setResponseOpen(true);
    }

    const handleClose = () => {
        setAddOpen(false);
        setResponseOpen(false);
    }

    const getDetailPanelHeight = React.useCallback(() => 200, []);

    return(
        <>
        <Container maxWidth={false} sx={{ height: '1000px', width: '100%', m: 2 }}>
            <br />
            <br />
            <Typography
                variant='h4'
                component='h4'
                sx={{textAlign:'center', mt:3, mb:3}}
            >Feedback
            </Typography>
            <Button
                sx={{mb: 2}}
                onClick={handleAddRow}
            >
                Add
            </Button>
            <Button
                sx={{mb: 2}}
                disabled={rowSelectionModel.length !== 1}
                onClick={handleResponseRow}
            >
                Response
            </Button>

            <DataGridPremium
                checkboxSelection
                columns={[
                    {headerName: 'Submit Date',
                            field: 'submitDate',
                            type:"date",
                            width: 225,
                            valueGetter: (params) => {
                                if(params && params.row && params.row.submitDate) {
                                    return moment(params.row.submitDate).toDate();
                                } else {
                                    return null; // or some default value
                                }
                            },
                            renderCell: (params) => {
                                if(params && params.row && params.row.submitDate) {
                                    return moment(params.row.submitDate).format('MM/DD/YYYY');
                                } else {
                                    return null; // or some default value
                                }
                            },
                    },
                    {headerName: 'Topic', field: 'topic', width: 200},
                    {headerName: 'Comment', field: 'comment', editable: true, width: 1000, renderCell: renderCellExpand, ...multilineColumn},
                    {headerName: 'Person', field: 'person', width: 200}
                    ]}
                disableRowSelectionOnClick
                getDetailPanelHeight={getDetailPanelHeight}
                getDetailPanelContent={getDetailPanelContent}
                initialState={{
                    sorting: {
                        sortModel: [{field: 'postDate', sort: 'asc'}]
                    },
                }}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                onRowSelectionModelChange={(newSelectionModel) => {
                    setRowSelectionModel(newSelectionModel);
                }}
                onSortModelChange={(newSortModel) => {
                    setSortModel(newSortModel);
                    cookie.save('feedbackTableSortModel', newSortModel, {path: '/'});
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
        <AddFeedback
            open={addOpen}
            onclose={handleClose}
            setAddOpen={setAddOpen}
            data={data}
            setData={setData}
        /> : null}
    { responseOpen ?
        <ResponseFeedback
            open={responseOpen}
            onclose={handleClose}
            setResponseOpen={setResponseOpen}
            rowSelectionModel={rowSelectionModel}
            data={data}
            setData={setData}
        /> : null}
    </>
    )
}

export default FeedbackTable;