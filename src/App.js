import React from "react";
import MainComponent from "./components/MainComponent";
import "./App.css";
import store from "./app/store";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<MainComponent />} />
        <Route path="/store" element={<MainComponent />} />
      </Routes>
    </Provider>
  );
}

export default App;
