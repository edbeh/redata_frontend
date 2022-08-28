import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { BASE_API_URL } from "const";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

axios.defaults.baseURL = BASE_API_URL;

console.log("BASE_API_URL", BASE_API_URL);

// axios.interceptors.request.use(
//   (request: any) => {
//     // const token = getTokenLocalStorage();
//     // request.headers["Authorization"] = `Bearer ${token}`;
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

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
