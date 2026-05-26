export interface Usuario {
  id?: number;
  nome: string;
  cpf?: string;
  foto: string;
  dataNascimento?: string;
  email?: string;
  telefone?: string;
}

export interface UsuarioCadastrar {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  senha?: string;
  confirmarSenha?: string;
}
