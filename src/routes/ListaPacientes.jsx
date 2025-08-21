import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';

import { pacientesMock } from '../data/mockPatients.js';

import Paciente from '../components/Paciente';


const ListaPacientes = () => {

  const [pacientesEncontrados, setPacientesEncontrados] = useState(pacientesMock);

  
    
  console.log(pacientesMock);

  return (
  <div className='page_lista-pacientes'>

    <button>
      <Link  to='/formulario'>Novo paciente</Link>
    </button>

    <label htmlFor="text">Pesquisar paciente</label>
    <input type="text" onChange={(e) => Pesquisar(e.target.value)}/>

    <div className="titulo_tabela" >
      <h2>Imagem</h2>
      <h2>Nome</h2>
      <h2>Telefone</h2>
      <h2>Cidade</h2>
      <h2>Estado</h2>
      <h2>Ultimo Atendimento</h2>
      <h2>Proximo Atendimento</h2>
      

    </div>

    <div className='lista-pacientes'>
      {pacientesEncontrados.map(paciente => (
        <Paciente key={paciente.id} paciente={paciente} className="pacie"/>
      ))}
    </div>

  </div>
  )
}


export default ListaPacientes