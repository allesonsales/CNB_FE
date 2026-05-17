import { NotificacaoAcao } from '../NotificacaoAcao';
import { NotificacaoTipo } from '../NotificacaoTipo';
import { UsuarioResumido } from '../usuario/usuario-resumido';

export interface Notificacao {
  id: number;
  tipo: NotificacaoTipo;
  thumbnail?: string;
  dataCriacao: string;
  remetente: UsuarioResumido;
  acaoId?: number;
  acao?: NotificacaoAcao;
  mensagem: string;
  lida: boolean;
}
