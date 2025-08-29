import React from 'react'
import Patientform from './Patientform'
import { useLocation } from "react-router-dom";


const EditarPaciente = () => {
    const location = useLocation()
   
    const {paciente} = location.state || {}
    
  
    return (
    <div>

       <Patientform pacienteDados={paciente} />


    </div>
  )
}

export default EditarPaciente