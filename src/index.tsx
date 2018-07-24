import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { mainReducer, defaultState } from './reducers';
import thunk from 'redux-thunk';

import 'normalize.css';
import 'styles/main.scss';

import Root from 'views';

import history from 'utils/history';

import { ROOT_NODE } from './constants';

const store = createStore(mainReducer, defaultState(), applyMiddleware(thunk));

const render = () => {
  ReactDOM.render(
    (
      <Provider store={store}>
        <Router history={history}>
          <Root />
        </Router>
      </Provider>
    ),
    ROOT_NODE as HTMLElement,
  );
};

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(ROOT_NODE as HTMLElement);
    render();
  });
}

render();
