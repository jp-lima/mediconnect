export interface Patient {
  id: string;
  // Dados pessoais
  name: string;
  socialName?: string;
  cpf: string;
  rg?: string;
  otherDocuments?: {
    type: string;
    number: string;
  };
  gender: 'masculine' | 'feminine' | 'other';
  birthDate: string;
  ethnicity?: string;
  race?: string;
  nationality?: string;
  birthplace?: string;
  profession?: string;
  maritalStatus?: string;
  
  // Família
  motherName?: string;
  motherProfession?: string;
  fatherName?: string;
  fatherProfession?: string;
  responsibleName?: string;
  responsibleCpf?: string;
  spouseName?: string;
  
  // Configurações especiais
  isNewbornWithInsurance?: boolean;
  legacyCode?: string;
  photo?: string;
  
  // Contato
  email?: string;
  cellphone?: string;
  phone1?: string;
  phone2?: string;
  
  // Endereço
  address?: {
    zipCode?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    reference?: string;
  };
  
  // Observações e anexos
  observations?: string;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    uploadDate: string;
  }>;
  
  // Informações médicas
  bloodType?: string;
  weight?: number;
  height?: number;
  allergies?: string;
  
  // Informações de convênio
  insurance?: string;
  plan?: string;
  registrationNumber?: string;
  cardValidity?: string;
  indefiniteValidity?: boolean;
  
  // Informações administrativas
  isVip?: boolean;
  lastAppointment?: string;
  nextAppointment?: string;
  
  // Metadados
  createdAt: string;
  updatedAt: string;
}

export interface PatientFilters {
  search?: string;
  insurance?: string;
  isVip?: boolean;
  isBirthday?: boolean;
  city?: string;
  state?: string;
  ageRange?: {
    min?: number;
    max?: number;
  };
  lastAppointmentRange?: {
    start?: string;
    end?: string;
  };
}