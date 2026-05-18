import { AmizadeStatusRes } from './amizade-status';

export class Amizade {
  id?: number;
  solicitanteId?: number;
  solicitadoId?: number;
  status?: AmizadeStatusRes;
  dataSolicitacao?: Date;
  dataResposta?: Date | null;
}
