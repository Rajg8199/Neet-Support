import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "/index.css";
import { Provider } from 'react-redux'
import { globalStore } from "./store/globalStore.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ globalStore }>
        <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
