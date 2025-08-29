import React from 'react'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import { pacienteMock } from '../data/mockPatients.js';
import {supabase} from '../supabaseClient.js'

import Paciente from '../components/Paciente';
//import fetchPacientes from '../data/ImportPacientes.js'

const ListaPacientes = () => {

  

  const [pacientes, setPacientes] = useState([])

  const [pacientesEncontrados, setPacientesEncontrados] = useState(pacientes);

  useEffect(() => {
    const fetchPacientes = async () => {
    const { data, error } = await supabase
    .from("pacientes")
    .select("*");
    
    console.log("data:", data);
    console.log("error:", error);
    setPacientes(data)
      };

    fetchPacientes();
  }, []);
  
    const Pesquisar = ( valor ) => {
      valor = valor.toLowerCase()
      let lista = []

      if(valor.length === 0){
      setPacientesEncontrados(pacientes)  
      }else{
        setPacientesEncontrados([])
      }
      for(let i =0; pacientes.length > i;i++ ){
        
        let paciente = pacientes[i]
        
        let numero = paciente.celular
        let cpf = paciente.cpf
        let nome = paciente.nome.toLowerCase()

        if(numero.includes(valor) || cpf.includes(valor) || nome.includes(valor)){
          console.log(paciente)
          lista = [...lista,paciente]

          setPacientesEncontrados(lista)
 
        }
    }
    }

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
      {pacientes.map(paciente => (
        <Paciente key={paciente.id} paciente={paciente} className="paciente"/>
      ))}
    </div>

  </div>
  )
}


export default ListaPacientes