import React from 'react'
import {useNavigate} from 'react-router-dom'


const Paciente = ( { paciente }) => {

  const navigate = useNavigate()

    const handleChange = (valor) => {
        if(valor === "editar"){
          navigate(`/editarpaciente`, {state: {paciente}})



          console.log(paciente)
           

        }

    }
  
  
    return (
    <div className='comp_paciente'>
      
        <img src="../public/avatar.png" alt="" />
      
        <div className='nome_vip_convenio'>
          <p>{paciente.nome}</p>
          
          <div className='vip_convenio'>
              {paciente.ehVip ? <div className='vip'><p>VIP</p></div> : null}
              {paciente.convenio ? <div className='convenio'><p>{paciente.convenio}</p></div> : null}
          </div>
        </div>



        <p>{paciente.celular}</p>
        <p>{paciente.cidade}</p>
        <p>{paciente.estado}</p>
        <p>{new Date(paciente.ultimaConsulta).toLocaleString()}</p>
        <p>{new Date(paciente.proximaConsulta).toLocaleString()}</p>

        <select name="" id="dropdown_opc" onChange={(e) => handleChange(e.target.value)}>
            <option value="">:</option>
            <option value="editar" >Editar</option>
            <option  value="deletar" > Deletar</option>
            <option value="marcarConsulta">Marcar Consulta</option>
        </select>
        
    </div>
  )
}

export default Paciente