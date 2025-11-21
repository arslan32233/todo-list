import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AddTodoPage from "./pages/AddTodoPage.jsx";
import EditTodoPage from "./pages/EditTodoPage.jsx";

import Layout from "./components/Layout.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function () {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddTodoPage />} />
          <Route path="/edit/:id" element={<EditTodoPage />} />
        </Routes>

        <ToastContainer position="bottom-right" autoClose={2000} />
      </Layout>
    </Router>
  );
}
