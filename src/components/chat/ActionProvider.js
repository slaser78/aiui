// in ActionProvider.jsx
import React from 'react';
import axios from "axios";
import {UrlContext} from "../../context";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const urlValue = React.useContext(UrlContext);
    const handleHello = () => {
        const botMessage = createChatBotMessage('Nice to meet you.');

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleDog = () => {
        const botMessage = createChatBotMessage(
            "Here's a nice dog picture for you!",
            {
                widget: 'dogPicture',
            }
        );

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    async function getMessage (message) {
        let botMessage = "";
        try {
            const response = await axios.get(urlValue.urlValue + `/getChatResponse?message=${message}&person=${localStorage.getItem("username")}`);
                botMessage = createChatBotMessage(response.data.data)
            } catch (err) {
                console.log(err);
            }
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    // Put the handleHello function in the actions object to pass to the MessageParser
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleDog,
                        getMessage
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;