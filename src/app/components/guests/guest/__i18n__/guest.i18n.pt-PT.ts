import { LfStorage } from '@lightweightform/core';

/**
 * Guest i18n object for the pt-PT locale.
 */
export const guestI18nPtPT: Record<string, any> = {
  '/guests/?': {
    label: (ctx: LfStorage) => ctx.get('name') || '[Sem nome]'
  },
  '/guests/?/name': {
    label: 'Nome completo',
    legend:
      'Por favor tenha a certeza de que o nome está correto de acordo com o ' +
      'documento, caso contrário não poderemos aceitar o hóspede.',
    validations: {
      UNLIKELY_NAME:
        'Por favor compreenda que não poderemos aceitar o hóspede se o nome ' +
        'declarado não estiver correto.'
    }
  },
  '/guests/?/document-type': {
    label: 'Tipo de documento',
    options: [
      { value: 'passport', label: 'Passaporte' },
      { value: 'id', label: 'Cartão de identificação' }
    ]
  },
  '/guests/?/document-number': {
    label: 'Número do documento'
  },
  '/guests/?/birth-date': {
    label: 'Data de nascimento'
  },
  '/guests/?/email': {
    label: 'E-mail'
  }
};
