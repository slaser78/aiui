import React from 'react';
import { createRoot } from 'react-dom/client';
import Init from './init';
import App from './App';

const Index = () => {
    const username = localStorage.getItem("username");
    return (
        <>
            {username ?
                <App/>
                :
                <Init/>
            }
        </>
    )
};
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Index />);