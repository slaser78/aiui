import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        if (message.includes('hello')) {
            actions.handleHello();
        }
        else if (message.includes('dog')) {
            actions.handleDog();
        }
        else {
            //Send message to backend
            actions.getMessage(message);
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;