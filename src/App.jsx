import React from "react";
import './App.css'; // Assuming you have some styles in App.css
import Patientform from './routes/Patientform.jsx' ;
import { Outlet } from "react-router-dom";



const App = () => (
  <>
    <h1>MedicoConnect</h1>
    <Outlet/>
    



  </>
);

export default App;

