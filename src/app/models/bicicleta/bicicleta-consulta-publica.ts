import { UsuarioResumido } from '../usuario/usuario-resumido';
import { BicicletaCategoria } from './BicicletaCategoria';
import { BicicletaCor } from './BicicletaCor';
import { BicicletaMarca } from './BicicletaMarca';
import { BicicletaStatus } from './BicicletaStatus';

export interface BicicletaConsultaPublica {
  id: number;
  categoria: BicicletaCategoria;
  cor: BicicletaCor;
  marca: BicicletaMarca;
  aro: number;
  usuario: UsuarioResumido;
  qrCodePath: string;
  numeroSerie: string;
  status: BicicletaStatus;
  dataRoubo: Date | null;
  dataAutenticacao: Date | null;
}
