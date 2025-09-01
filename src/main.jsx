import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Patientform from "./routes/Patientform.jsx";
import ListaPacientes from "./routes/ListaPacientes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/pacientes",
        element: <ListaPacientes />,
      },
      {
        path: "/formulario",
        element: <Patientform />,
      },
      {
        path: "/paciente/:id/editar",
        element: <Patientform />,
      },
      {
        path: "/agendamentos",
        element: (
          <div className="page-placeholder">
            <h1>Agendamentos</h1>
            <p>Página em desenvolvimento</p>
          </div>
        ),
      },
      {
        path: "/relatorios",
        element: (
          <div className="page-placeholder">
            <h1>Relatórios</h1>
            <p>Página em desenvolvimento</p>
          </div>
        ),
      },
      {
        path: "/configuracoes",
        element: (
          <div className="page-placeholder">
            <h1>Configurações</h1>
            <p>Página em desenvolvimento</p>
          </div>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
