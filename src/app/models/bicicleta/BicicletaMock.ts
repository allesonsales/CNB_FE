import { Bicicleta } from './Bicicleta';
import { BicicletaCategoria } from './BicicletaCategoria';
import { BicicletaCor } from './BicicletaCor';
import { BicicletaMarca } from './BicicletaMarca';
import { BicicletaStatus } from './BicicletaStatus';

export const bicicletasMock: Bicicleta[] = [
  {
    id: 1,
    categoria: BicicletaCategoria.MOUNTAIN_BIKE,
    cor: BicicletaCor.PRETO,
    marca: BicicletaMarca.OGGI,
    aro: 29,
    usuarioId: 1,
    qrCodePath: 'qrcodes/bike-1.png',
    numeroSerie: 'OGG123456789',
    status: BicicletaStatus.PADRAO,
  },
  {
    id: 2,
    categoria: BicicletaCategoria.SPEED,
    cor: BicicletaCor.VERMELHO,
    marca: BicicletaMarca.CALOI,
    aro: 28,
    usuarioId: 1,
    qrCodePath: 'qrcodes/bike-2.png',
    numeroSerie: 'CAL987654321',
    status: BicicletaStatus.TRANSACAO,
  },
  {
    id: 3,
    categoria: BicicletaCategoria.ELETRICA,
    cor: BicicletaCor.CINZA,
    marca: BicicletaMarca.OGGI,
    aro: 27,
    usuarioId: 1,
    qrCodePath: 'qrcodes/bike-3.png',
    numeroSerie: 'ELE112233445',
    status: BicicletaStatus.ROUBADA,
  },
];
