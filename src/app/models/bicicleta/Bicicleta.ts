import { BicicletaCategoria } from './BicicletaCategoria';
import { BicicletaCor } from './BicicletaCor';
import { BicicletaMarca } from './BicicletaMarca';
import { BicicletaStatus } from './BicicletaStatus';
import { Usuario } from '../Usuario';
import { Transacao } from '../transacao/transacao';

export interface Bicicleta {
  id: number;
  categoria: BicicletaCategoria;
  cor: BicicletaCor;
  marca: BicicletaMarca;
  aro: number;
  usuarioId: number;
  qrCodePath: string;
  numeroSerie: string;
  status: BicicletaStatus;
  transacoes?: Transacao[];
}

export interface BicicletaLista {
  id: number;
  categoria?: BicicletaCategoria;
  cor?: BicicletaCor;
  marca?: BicicletaMarca;
  aro?: number;
  status?: BicicletaStatus;
  numeroSerie: string;
}

export interface cadastroBicicleta {
  categoria: BicicletaCategoria;
  cor: BicicletaCor;
  marca: BicicletaMarca;
  aro: number;
  usuario: Usuario;
  qrCodePath: string;
  numeroSerie: string;
  status: BicicletaStatus;
}
