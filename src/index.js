import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Calculator from './components/Calculator';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Calculator);

if (module.hot) {
  module.hot.accept('./components/Calculator', () => {
    const NextApp = require('./components/Calculator').default;
    render(NextApp);
  });
}
