import React from 'react'
import {Link} from 'react-router-dom';

import { pacientesMock } from '../data/mockPatients.js';

import Paciente from '../components/Paciente';


const ListaPacientes = () => {
  console.log(pacientesMock);

  return (
  <div className='page_lista-pacientes'>

    <button>
      <Link  to='/formulario'>Novo paciente</Link>
    </button>

    <label htmlFor="text">Pesquisar paciente</label>
    <input type="text" />

    <div>
      <h2>Nome</h2>
      <h2>Telefone</h2>
      <h2>Cidade</h2>
      <h2>Estado</h2>
      <h2>Ultimo Atendimento</h2>
      <h2>Proximo Atendimento</h2>
      <h2>Ações</h2>

    </div>

    <div className='lista-pacientes'>
      {pacientesMock.map(paciente => (
        <Paciente key={paciente.id} paciente={paciente} />
      ))}
    </div>

  </div>
  )
}

export default ListaPacientes