import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from "react-router-dom";

export let designerRouter: any = null;

ReactDOM.render(
    <HashRouter ref={ref => designerRouter = ref}>
        <App/>
    </HashRouter>,
    document.getElementById('root')
);