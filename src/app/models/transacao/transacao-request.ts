import { Bicicleta } from '../bicicleta/Bicicleta';
import { UsuarioResumido } from '../usuario/usuario-resumido';

export interface TransacaoRequest {
  bicicleta: Bicicleta;
  comprador: UsuarioResumido;
  valor: number;
}
