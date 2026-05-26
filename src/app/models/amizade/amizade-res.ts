import { Usuario } from '../Usuario';
import { UsuarioResumido } from '../usuario/usuario-resumido';
import { AmizadeStatusRes } from './amizade-status';

export interface AmizadeResponse {
  id?: number;
  solicitante?: UsuarioResumido;
  solicitado?: UsuarioResumido;
  status?: AmizadeStatusRes;
  dataSolicitacao?: Date;
  dataResposta?: Date | null;
}
