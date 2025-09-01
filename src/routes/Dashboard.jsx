import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../supabaseClient.js';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPacientes: 0,
    novosEsseMes: 0,
    agendamentosHoje: 0,
    proximosAgendamentos: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Total de pacientes
        const { data: pacientes, error: errorPacientes } = await supabase
          .from('pacientes')
          .select('id, created_at, nome');

        if (!errorPacientes && pacientes) {
          setStats(prev => ({
            ...prev,
            totalPacientes: pacientes.length,
            novosEsseMes: pacientes.filter(p => {
              const created = new Date(p.created_at);
              const now = new Date();
              return created.getMonth() === now.getMonth() && 
                     created.getFullYear() === now.getFullYear();
            }).length
          }));
        }

        // Aqui você pode adicionar mais consultas para agendamentos quando tiver essa tabela
        
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Novo Paciente',
      description: 'Cadastrar um novo paciente',
      icon: UserPlus,
      link: '/formulario',
      color: 'bg-blue-500'
    },
    {
      title: 'Lista de Pacientes',
      description: 'Ver todos os pacientes',
      icon: Users,
      link: '/pacientes',
      color: 'bg-green-500'
    },
    {
      title: 'Agendamentos',
      description: 'Gerenciar consultas',
      icon: Calendar,
      link: '/agendamentos',
      color: 'bg-purple-500'
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="stat-card">
      <div className="stat-card-content">
        <div className="stat-info">
          <h3>{title}</h3>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`stat-icon ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  const ActionCard = ({ title, description, icon: Icon, link, color }) => (
    <Link to={link} className="action-card">
      <div className={`action-icon ${color}`}>
        <Icon size={24} />
      </div>
      <div className="action-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao MediConnect</p>
      </div>

      {/* Estatísticas */}
      <div className="stats-grid">
        <StatCard
          title="Total de Pacientes"
          value={stats.totalPacientes}
          icon={Users}
          color="stat-blue"
        />
        <StatCard
          title="Novos este Mês"
          value={stats.novosEsseMes}
          icon={TrendingUp}
          color="stat-green"
        />
        <StatCard
          title="Agendamentos Hoje"
          value={stats.agendamentosHoje}
          icon={Calendar}
          color="stat-purple"
        />
        <StatCard
          title="Pendências"
          value={0}
          icon={AlertCircle}
          color="stat-orange"
        />
      </div>

      {/* Ações Rápidas */}
      <div className="dashboard-section">
        <h2>Ações Rápidas</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <ActionCard key={index} {...action} />
          ))}
        </div>
      </div>

      {/* Próximos Agendamentos */}
      <div className="dashboard-section">
        <h2>Próximos Agendamentos</h2>
        <div className="appointments-card">
          <div className="appointments-empty">
            <Clock size={48} />
            <p>Nenhum agendamento para hoje</p>
            <Link to="/agendamentos" className="btn-primary">
              Gerenciar Agendamentos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
