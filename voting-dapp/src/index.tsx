import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/theme.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import store from 'store';
import { Provider } from 'react-redux';

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK');

const getLibrary = (provider: ExternalProvider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
