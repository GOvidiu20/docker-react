import React from 'react';
import './App.module.scss';
import BaseLayout from "./view/components/BaseLayout.js";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div>
            <BrowserRouter>
                <BaseLayout/>
            </BrowserRouter>
        </div>
    );
}

export default App;
