import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



//ssdsdsdsdsdsdsd

/*
  useEffect(() => {
    const fetchPacientes = async () => {
      const { data, error } = await supabase
        .from("pacientes") // nome da tabela
        .select("*");      // busca todas as colunas

      if (error) {
        console.error("Erro ao buscar pacientes:", error);
      } else {
        setPacientes(data);
        
      }
    };

    fetchPacientes();
  }, []);
  */