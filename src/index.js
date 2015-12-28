import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';
import ModelContainer from './containers/ModelContainer';


const modelContainer = ModelContainer.getInstance();


window.document.addEventListener('DOMContentLoaded', () => {
  const appContainer = window.document.querySelector('#js-app-container');
  ReactDOM.render(React.createElement(Root), appContainer);
});
