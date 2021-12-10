import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Auth";
import store from './store/transactions-slice';
import { Provider } from "react-redux";

// browser router should be the outermost

ReactDOM.render(
  <BrowserRouter> 
  <AuthProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </AuthProvider>
  </BrowserRouter>
  ,
  document.getElementById("root")
);
