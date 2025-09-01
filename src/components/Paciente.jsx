import React from "react";
import { Link } from "react-router-dom";

const Paciente = ({ paciente }) => {
  return (
    <div className="comp_paciente">
      <img src="../public/avatar.png" alt="" />

      <div className="nome_vip_convenio">
        <Link to={`/paciente/${paciente.id}/editar`} className="nome-link">
          <p>{paciente.nome}</p>
        </Link>

        <div className="vip_convenio">
          {paciente.ehVip ? (
            <div className="vip">
              <p>VIP</p>
            </div>
          ) : null}
          {paciente.convenio ? (
            <div className="convenio">
              <p>{paciente.convenio}</p>
            </div>
          ) : null}
        </div>
      </div>

      <p>{paciente.celular}</p>
      <p>{paciente.cidade}</p>
      <p>{paciente.estado}</p>
      <p>{new Date(paciente.ultimaConsulta).toLocaleString()}</p>
      <p>{new Date(paciente.proximaConsulta).toLocaleString()}</p>
    </div>
  );
};

export default Paciente;
