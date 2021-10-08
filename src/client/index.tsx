import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {store, persistor} from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import { ApiProvider } from "./contexts/ApiContext";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApiProvider baseURL={"http://localhost:3000"}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ApiProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);