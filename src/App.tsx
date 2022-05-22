import React from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { MainPage } from "./pages/MainPage";

import "../src/scss/App.scss";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
