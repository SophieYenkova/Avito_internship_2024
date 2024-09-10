import React from "react";
import ReactDOM from "react-dom/client";
import App from "../app/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "../shared/store/index";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
