import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'rebass'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Provider>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
