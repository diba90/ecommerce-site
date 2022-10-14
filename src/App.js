import React from "react";
import MainComponent from "./components/MainComponent";
import "./App.css";
import store from "./app/store";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Account from "./components/Account";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<MainComponent />} />
        <Route path="/store" element={<MainComponent />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Provider>
  );
}

export default App;
