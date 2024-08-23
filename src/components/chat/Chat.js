import React from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import Container from '@mui/material/Container';
import './chatContainer.css'

import config from "./chatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

function Chat() {
    return (
        <Container sx={{ height: '1000px', width: '100%', m: 2 }}>
            <div className="Chat">
                <br />
                <br />
                <br />
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </div>
        </Container>
    );
}

export default Chat;