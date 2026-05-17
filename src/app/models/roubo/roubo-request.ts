import { Bicicleta } from '../bicicleta/Bicicleta';
import { Endereco } from '../endereco/Endereco';
import { RouboStatus } from './roubo-status';
import { RouboTipo } from './roubo-tipo';

export class RouboRequest {
  id?: number;
  endereco?: Endereco;
  bicicleta?: Bicicleta;
  dataRoubo?: Date;
  tipoRoubo?: RouboTipo;
}
