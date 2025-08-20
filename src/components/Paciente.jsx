import React from 'react'
 


const Paciente = ( { paciente }) => {
  
  
    return (
    <div className='comp_paciente'>
        <img src="" alt="" />

        {paciente.ehVip ? <div className='vip'><p>VIP</p></div> : null}

        {paciente.convenio ? <div className='convenio'><p>{paciente.convenio}</p></div> : null}




        <p>{paciente.celular}</p>
        <p>{paciente.endereco.cidade}</p>
        <p>{paciente.endereco.estado}</p>
        <p>{new Date(paciente.ultimaConsulta).toLocaleString()}</p>
        <p>{new Date(paciente.proximaConsulta).toLocaleString()}</p>
        
        
    </div>
  )
}

export default Paciente