import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import Container from '@mui/material/Container';
import './chatContainer.css'
import SetSettings from "./SetSettings";

import config from "./chatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import DocumentOpen from "./DocumentOpen";

function Chat() {
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [documentOpen, setDocumentOpen] = React.useState(false);

    const handleSettingsOpen = () => {
        setSettingsOpen (true);
    }

    const handleDocumentOpen = () => {
        setDocumentOpen (true)
    }

    const handleClose = () => {
        setSettingsOpen(false);
        setDocumentOpen(false);
    }
    return (
        <>
        <Container sx={{ height: '1000px', width: '100%', m: 2 }}>
            <div className="Chat">
                <br />
                <br />
                <br />
                <Typography
                    variant='h4'
                    component='h4'
                    sx={{textAlign:'center', mt:3, mb:3}}
                >Chat
                </Typography>
                <Button
                    sx={{mb: 2}}
                    onClick={handleDocumentOpen}
                >
                    Document
                </Button>
                <Button
                    sx={{mb: 2}}
                    onClick={handleSettingsOpen}
                >
                    Settings
                </Button>
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </div>
        </Container>
        { settingsOpen ?
            <SetSettings
                open={setSettingsOpen}
                onclose={handleClose}
                setSettingsOpen={setSettingsOpen}
            /> : null}
        { DocumentOpen ?
            <SetSettings
                open={documentOpen}
                onclose={handleClose}
                setDocumentOpen={setDocumentOpen}
            /> : null}
        </>
    );
}

export default Chat;