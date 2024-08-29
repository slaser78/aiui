import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import Person from '@mui/icons-material/Person';
import Source from '@mui/icons-material/Source';
import Chat from '@mui/icons-material/Chat';
import Feedback from '@mui/icons-material/Feedback';
import EmojiPeople from '@mui/icons-material/EmojiPeople';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Security from '@mui/icons-material/Security';

import Tooltip from '@mui/material/Tooltip';

export const mainListItems = (
    <>
        <ListItemButton href='/'>
            <Tooltip title="Chat" placement="right">
                <ListItemIcon>
                    <Chat />
                </ListItemIcon>
            </Tooltip>
            <ListItemText  primary="Chat" />
        </ListItemButton>
        <ListItemButton href='/source'>
            <Tooltip title="Source" placement="right">
                <ListItemIcon>
                    <Source />
                </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Source" />
        </ListItemButton>
        <ListItemButton href='/document'>
            <Tooltip title="Document" placement="right">
                <ListItemIcon>
                    <FileCopyIcon />
                </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Document" />
        </ListItemButton>
        <ListItemButton href='/feedback'>
            <Tooltip title="Feedback" placement="right">
                <ListItemIcon>
                    <Feedback />
                </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Feedback" />
        </ListItemButton>
    </>
);
export const secondaryListItems = (
    <>
        <ListItemButton href='/person'>
            <Tooltip title="Person" placement="right">
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Person" />
        </ListItemButton>
        <ListItemButton href='/personSource'>
            <Tooltip title="Person Source" placement="right">
                <ListItemIcon>
                    <EmojiPeople />
                </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Person Source" />
        </ListItemButton>
        <ListItemButton href='/role'>
            <Tooltip title="Role" placement="right">
                <ListItemIcon>
                    <Security />
                </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Role" />
        </ListItemButton>
        <ListItemButton href="/accountMgt">
            <Tooltip title="Management" placement="right">
                <ListItemIcon>
                    <ManageAccounts />
                </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Management" />
        </ListItemButton>
    </>

);