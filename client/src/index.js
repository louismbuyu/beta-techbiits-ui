import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import 'rc-tween-one/assets/index.css';
import 'rc-texty/assets/index.css';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import 'react-alice-carousel/lib/alice-carousel.css';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { StoreProvider } from "easy-peasy";
import store from './models/index';

ReactDOM.render(
    <StoreProvider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StoreProvider>, document.getElementById('root'));

serviceWorker.unregister();