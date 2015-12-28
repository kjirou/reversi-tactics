import ReactDOM from 'react-dom';

import App from './App';


window.document.addEventListener('DOMContentLoaded', () => {
  const appContainer = window.document.querySelector('#js-app-container');
  const app = new App({
    renderer: el => ReactDOM.render(el, appContainer),
  });
  app.update(state => state);
});
