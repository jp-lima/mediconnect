import React from 'react'
 


const Paciente = ( { paciente }) => {
  
  
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
        
        
    </div>
  )
}

export default Paciente