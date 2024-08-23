// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from './DogPicture.js';
const botName = 'JSGPT';

const config = {
    initialMessages: [createChatBotMessage(`Hi!`)],
    botName: botName,
    widgets: [
        {
            widgetName: 'dogPicture',
            widgetFunc: (props) => <DogPicture {...props} />,
        },
    ],
};

export default config;