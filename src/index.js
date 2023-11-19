import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';

import store from './components/Redux/Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <React.StrictMode>

            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
