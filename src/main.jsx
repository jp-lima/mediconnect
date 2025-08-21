import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider}  from 'react-router-dom'

import Patientform from './routes/Patientform.jsx'
import ListaPacientes from './routes/ListaPacientes.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
        {
            path: '/',
            element: <ListaPacientes/>
        },
        {
            path:'formulario',
            element:<Patientform/>
        }


    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
