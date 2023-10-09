import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ListFiles from "./components/ListFiles";
import FileUpload from "./components/FileUpload";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="file" element={<ListFiles />}></Route>
      
        <Route path="/upload" element={<FileUpload />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);