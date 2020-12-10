import { LfStorage } from '@lightweightform/core';
import { NumericInput } from '@lightweightform/numeric-input';

/**
 * Currency options for the pt-PT locale.
 */
const currencyOptions = {
  scale: 2,
  decimalSeparator: ',',
  thousandsSeparator: ' ',
  prefix: '',
  suffix: ' €'
};

/**
 * Reservation details i18n object for the pt-PT locale.
 */
export const reservationDetailsI18nPtPT: Record<string, any> = {
  '/reservation-details': {
    label: 'Detalhes da reserva'
  },
  '/reservation-details/name': {
    label: 'Nome',
    helpMessage: 'A reserva ficará neste nome'
  },
  '/reservation-details/email': {
    label: 'E-mail',
    validations: {
      INVALID_EMAIL: 'O e-mail é inválido.'
    }
  },
  '/reservation-details/phone-number': {
    label: 'Número telefónico',
    validations: {
      INVALID_PHONE_NUMBER: 'O número telefónico é inválido.'
    }
  },
  '/reservation-details/check-in-out': {
    label: 'Datas de check-in/check-out',
    legend: 'Check-in das 16:00h às 23:00h',
    validations: {
      CHECK_IN_OUT_SAME_DAY:
        'O check-in e check-out não podem ser no mesmo dia.'
    }
  },
  '/reservation-details/check-in-hour': {
    label: 'Hora de chegada',
    suffix: 'h',
    helpMessage: 'Hora aproximada de check-in (se souber)'
  },
  '/reservation-details/special-requests': {
    label: 'Pedidos especiais'
  },
  '/reservation-details/rooms': {
    label: 'Quartos',
    addRowActionText: 'Adicionar quarto',
    removeRowsActionText: 'Remover quartos',
    noRowsText: 'Nenhum quarto adicionado.',
    columnLabels: {
      type: 'Tipo de quarto',
      price: 'Preço por noite',
      'smoking-room': 'Quarto para fumadores?'
    },
    validations: {
      LF_SIZE_OUT_OF_BOUNDS: 'Pelo menos 1 quarto tem de ser adicionado.'
    }
  },
  '/reservation-details/rooms/?/type': {
    label: 'Tipo de quarto',
    options: [
      { value: 'single', label: 'Solteiro' },
      { value: 'double', label: 'Casal' },
      { value: 'twin', label: 'Duplo' }
    ]
  },
  '/reservation-details/rooms/?/price': {
    label: 'Preço do quarto por noite',
    ...currencyOptions
  },
  '/reservation-details/rooms/?/smoking-room': {
    label: 'Quarto para fumadores?'
  },
  '/reservation-details/total-amount': {
    label: 'Valor total',
    ...currencyOptions,
    legend: (ctx: LfStorage) => {
      if (ctx.get() === null) {
        return '';
      }
      const nightsSpent = ctx.get('../nights-spent');
      const amountPerNight = ctx.get('../amount-per-night');
      return `${nightsSpent} noite${
        nightsSpent === 1 ? '' : 's'
      } a ${NumericInput.format(amountPerNight, currencyOptions)} por noite`;
    }
  }
};
