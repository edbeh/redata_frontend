import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { BASE_API_URL } from "const";
import { getJwtTokenLocalStorage } from "utils";
import { PUBLIC_ENDPOINTS } from "api/endpoints";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

axios.defaults.baseURL = BASE_API_URL;

axios.interceptors.request.use(
  (request: any) => {
    if (PUBLIC_ENDPOINTS.find((route) => request?.url?.includes(route))) {
      return request;
    }

    const token = getJwtTokenLocalStorage();
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status > 300) {
      throw error;
    }
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
