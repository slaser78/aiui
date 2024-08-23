import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { LicenseInfo } from '@mui/x-license';
import {useRoutes} from '@patched/hookrouter';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import Maintenance from "./components/maintenance/AccountMgt";
import {Toolbar} from "@mui/material";
import { mainListItems, secondaryListItems } from './listItems';
import Button from "@mui/material/Button";
import Feedback from "./components/feedback/FeedbackTable";
import Chat from "./components/chat/Chat";
import Source from "./components/source/SourceTable";
import Person from "./components/person/PersonTable";
import Role from "./components/role/RoleTable";
import Document from "./components/document/DocumentTable";
import PersonSource from "./components/personSource/PersonSourceTable";

LicenseInfo.setLicenseKey('c7b965feb46d114c1411293e313f1868Tz04NDg2NCxFPTE3NDAyMjg1MTQwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y');

const routes = {
    '/': () => <Chat />,
    '/maintenance': () => <Maintenance />,
    '/source': () => <Source />,
    '/feedback': () => <Feedback />,
    '/person': () => <Person />,
    '/role': () => <Role />,
    '/document': () => <Document />,
    '/personSource': () => <PersonSource />
}

const drawerWidth = 240;
const role = localStorage.getItem("role")
const token1 = localStorage.getItem("token")
const token2 = "https://sso-dev.jten.mil/auth/realms/JTT/protocol/openid-connect/logout?id_token_hint="+{token1}+"&post_logout_redirect_uri=https%3A%2F%2Fjtp.jten.smil.mil"

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

const App = () => {
    const username = localStorage.getItem("username");
    const routeResult = useRoutes(routes);
    const [open, setOpen] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        if (role === 'ROLE_ADMIN') {
            setAdmin(true);
        }
    }, [setAdmin] )

    return (
        <>
                <ThemeProvider theme={mdTheme}>
                    <Box sx={{display: 'flex'}}>
                        <CssBaseline/>
                        <AppBar position="absolute" open={open}>
                            <Toolbar
                                sx={{
                                    pr: '24px', // keep right padding when drawer closed
                                }}
                            >
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer}
                                    sx={{
                                        marginRight: '36px',
                                        ...(open && {display: 'none'}),
                                    }}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{flexGrow: 1}}
                                >
                                    JSGPT
                                </Typography>
                                {username}
                                <Button variant="contained" href= {token2}>
                                    Logout
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <Toolbar
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    px: [1],
                                }}
                            >
                                <IconButton onClick={toggleDrawer}>
                                    <ChevronLeftIcon/>
                                </IconButton>
                            </Toolbar>
                            <Divider/>
                            <List component="nav">
                                {admin ?
                                    <>
                                    {mainListItems}
                                    <Divider sx={{my: 1}}/>
                                    {secondaryListItems}
                                    </>
                                    :
                                    <>
                                    {mainListItems}
                                    </>
                                }
                            </List>
                        </Drawer>
                        {routeResult}
                    </Box>
                </ThemeProvider>
        </>
    );
};
export default App;
