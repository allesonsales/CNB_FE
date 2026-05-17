import { TransacaoStatus } from './transacao-status';

export const transacaoStatusLabel: Record<TransacaoStatus, string> = {
  AGUARDANDO_ACEITE_COMPRADOR: 'Aguardando aceite do comprador',
  AGUARDANDO_CONFIRMACAO_VENDEDOR: 'Aguardando confirmação do vendedor',
  CANCELADA: 'Canecelada',
  CONCLUIDA: 'Concluída',
  PENDENTE: 'Pendente',
};
