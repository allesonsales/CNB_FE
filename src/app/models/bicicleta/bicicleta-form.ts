import { BicicletaCategoria } from './BicicletaCategoria';
import { BicicletaCor } from './BicicletaCor';
import { BicicletaMarca } from './BicicletaMarca';
import { BicicletaStatus } from './BicicletaStatus';

export interface BicicletaForm {
  categoria: BicicletaCategoria;
  marca: BicicletaMarca;
  aro: number;
  cor: BicicletaCor;
  usuarioId: number;
  status: BicicletaStatus;
  numeroSerie: string;
}
