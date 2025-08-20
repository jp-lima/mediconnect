import { Patient } from '@/types/patient';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva Santos',
    cpf: '123.456.789-01',
    gender: 'feminine',
    birthDate: '1985-03-15',
    cellphone: '11987654321',
    email: 'maria.silva@email.com',
    address: {
      city: 'São Paulo',
      state: 'SP',
      street: 'Rua das Flores, 123',
      zipCode: '01234-567'
    },
    insurance: 'Unimed',
    isVip: true,
    lastAppointment: '2024-08-10T14:30:00',
    nextAppointment: '2024-08-20T09:00:00',
    createdAt: '2024-01-15T10:00:00',
    updatedAt: '2024-08-10T14:30:00'
  },
  {
    id: '2',
    name: 'João Pereira Lima',
    cpf: '987.654.321-09',
    gender: 'masculine',
    birthDate: '1978-07-22',
    cellphone: '11976543210',
    address: {
      city: 'Santos',
      state: 'SP',
      street: 'Av. Atlântica, 456'
    },
    insurance: 'Bradesco Saúde',
    lastAppointment: '2024-08-05T16:00:00',
    createdAt: '2024-02-10T11:00:00',
    updatedAt: '2024-08-05T16:00:00'
  },
  {
    id: '3',
    name: 'Ana Carolina Rodrigues',
    cpf: '456.789.123-45',
    gender: 'feminine',
    birthDate: '1992-11-08',
    cellphone: '11965432109',
    email: 'ana.rodrigues@email.com',
    address: {
      city: 'Campinas',
      state: 'SP',
      street: 'Rua do Comércio, 789'
    },
    lastAppointment: '2024-07-28T10:15:00',
    nextAppointment: '2024-08-25T11:30:00',
    createdAt: '2024-03-05T09:00:00',
    updatedAt: '2024-07-28T10:15:00'
  },
  {
    id: '4',
    name: 'Carlos Eduardo Oliveira',
    cpf: '789.123.456-78',
    gender: 'masculine',
    birthDate: '1995-12-03',
    cellphone: '11954321098',
    address: {
      city: 'São Bernardo do Campo',
      state: 'SP',
      street: 'Praça Central, 321'
    },
    insurance: 'SulAmérica',
    isVip: false,
    lastAppointment: '2024-08-08T15:45:00',
    createdAt: '2024-04-12T14:00:00',
    updatedAt: '2024-08-08T15:45:00'
  },
  {
    id: '5',
    name: 'Fernanda Costa Almeida',
    cpf: '321.654.987-32',
    gender: 'feminine',
    birthDate: '1988-08-13',
    cellphone: '11943210987',
    email: 'fernanda.almeida@email.com',
    address: {
      city: 'Guarulhos',
      state: 'SP',
      street: 'Rua São João, 654'
    },
    insurance: 'Porto Seguro',
    lastAppointment: '2024-07-30T13:20:00',
    nextAppointment: '2024-08-18T14:00:00',
    createdAt: '2024-05-20T10:30:00',
    updatedAt: '2024-07-30T13:20:00'
  },
  {
    id: '6',
    name: 'Roberto Mendes Silva',
    cpf: '654.321.098-76',
    gender: 'masculine',
    birthDate: '1970-04-25',
    cellphone: '11932109876',
    address: {
      city: 'Osasco',
      state: 'SP',
      street: 'Av. dos Autonomistas, 987'
    },
    isVip: true,
    lastAppointment: '2024-08-12T11:00:00',
    nextAppointment: '2024-08-22T10:30:00',
    createdAt: '2024-01-08T16:00:00',
    updatedAt: '2024-08-12T11:00:00'
  }
];