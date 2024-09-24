import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
axios.defaults.withCredentials = true;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import { ThemeProvider } from '@material-tailwind/react';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ThemeProvider>
    <Provider store={store}>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  </ThemeProvider>
  // </StrictMode>,
)
