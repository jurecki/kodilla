import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.scss';
import './styles/global.scss';
import App from './components/App/AppContainer';
import { Provider } from 'react-redux';
import store from './redux/redux';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));