import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import HomePage from "./pages/HomePage.jsx";
import Page404 from "./pages/Page404.jsx";
import SingleNews from "./pages/SingleNews.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/news/:id" element={<SingleNews />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
