import { TransacaoStatus } from './transacao-status';
import { Bicicleta } from '../bicicleta/Bicicleta';
import { UsuarioResumido } from '../usuario/usuario-resumido';
import { Usuario } from '../Usuario';

export interface Transacao {
  id: number;
  bicicleta: Bicicleta;
  comprador: UsuarioResumido;
  valor: number;
  dataInicio: Date;
  dataFim: Date;
  status: TransacaoStatus;
  vendedor: Usuario;
}
