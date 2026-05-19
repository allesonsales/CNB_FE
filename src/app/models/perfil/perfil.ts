import { Amizade } from '../amizade/amizade';
import { AmizadeStatusRes } from '../amizade/amizade-status';
import { UsuarioResumido } from '../usuario/usuario-resumido';

export interface Perfil {
  usuario: UsuarioResumido;
  numeroAmigos: number;
  numeroGrupos: number;
  numeroKm: number;
  numeroPedais: number;
  numeroAltimetria: number;
  amizade: Amizade | null;
  isMeuPerfil: boolean;
}
