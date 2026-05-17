import { NotificacaoTipo } from 'src/app/models/NotificacaoTipo';
import { TransacaoStatus } from 'src/app/models/transacao/transacao-status';

export function resolverProximoStatus(
  acao: string,
  tipo: NotificacaoTipo,
): TransacaoStatus | null {
  if (acao === 'aceitarTransacao') {
    if (tipo === NotificacaoTipo.TRANSACAO_AGUARDANDO_ACEITE_COMPRADOR) {
      return TransacaoStatus.AGUARDANDO_CONFIRMACAO_VENDEDOR;
    }

    if (tipo === NotificacaoTipo.TRANSACAO_AGUARDANDO_CONFIRMACAO_VENDEDOR) {
      return TransacaoStatus.CONCLUIDA;
    }
  }

  if (acao === 'cancelarTransacao') {
    if (tipo === NotificacaoTipo.TRANSACAO_AGUARDANDO_ACEITE_COMPRADOR) {
      return TransacaoStatus.CANCELADA_PELO_COMPRADOR;
    }

    if (tipo === NotificacaoTipo.TRANSACAO_AGUARDANDO_CONFIRMACAO_VENDEDOR) {
      return TransacaoStatus.CANCELADA_PELO_VENDEDOR;
    }
  }

  return null;
}
