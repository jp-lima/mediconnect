import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../supabaseClient.js";

import Paciente from "../components/Paciente";
//import fetchPacientes from '../data/ImportPacientes.js'

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const { data, error } = await supabase.from("pacientes").select("*");

      console.log("data:", data);
      console.log("error:", error);
      if (data) {
        setPacientes(data);
        setPacientesFiltrados(data);
      }
    };

    fetchPacientes();
  }, []);

  const Pesquisar = (valor) => {
    valor = valor.toLowerCase();

    if (valor.length === 0) {
      setPacientesFiltrados(pacientes);
    } else {
      const filtrados = pacientes.filter((paciente) => {
        const nome = paciente.nome?.toLowerCase() || "";
        const telefone = paciente.telefone1 || "";
        const cpf = paciente.cpf || "";

        return (
          nome.includes(valor) ||
          telefone.includes(valor) ||
          cpf.includes(valor)
        );
      });
      setPacientesFiltrados(filtrados);
    }
  };

  return (
    <div className="page_lista-pacientes">
      <div className="lista-header">
        <h1>Lista de Pacientes</h1>
        <div className="lista-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Pesquisar por nome, CPF ou telefone..."
              className="search-input"
              onChange={(e) => Pesquisar(e.target.value)}
            />
          </div>
          <Link to="/formulario" className="btn-novo-paciente">
            Novo Paciente
          </Link>
        </div>
      </div>

      <div className="titulo_tabela">
        <div>Foto</div>
        <div>Nome</div>
        <div>Telefone</div>
        <div>Cidade</div>
        <div>Estado</div>
        <div>Último Atendimento</div>
        <div>Próximo Atendimento</div>
      </div>

      <div className="lista-pacientes">
        {pacientesFiltrados && pacientesFiltrados.length > 0 ? (
          pacientesFiltrados.map((paciente) => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              className="paciente"
            />
          ))
        ) : (
          <div className="empty-state">
            <p>Nenhum paciente encontrado</p>
            <Link to="/formulario" className="btn-novo-paciente">
              Cadastrar Primeiro Paciente
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaPacientes;
