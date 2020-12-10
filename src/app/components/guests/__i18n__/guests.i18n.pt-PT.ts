import { LfStorage } from '@lightweightform/core';

/**
 * Guests i18n object for the pt-PT locale.
 */
export const guestsI18nPtPT: Record<string, any> = {
  '/guests': {
    label: 'Hóspedes',
    addRowActionText: 'Adicionar hóspede',
    removeRowsActionText: 'Remover hóspedes',
    noRowsText: 'Nenhum hóspede adicionado.',
    columnLabels: {
      name: 'Nome do hóspede',
      navigation: 'Navegação'
    },
    navigateButtonLabel: 'Navegar para formulário',
    validations: {
      LF_SIZE_OUT_OF_BOUNDS: (ctx: LfStorage, { maxSize }) => {
        if (ctx.size() === 0) {
          return 'Pelo menos 1 hóspede tem de ser adicionado.';
        }
        return `Dados os quartos selecionados, no máximo ${maxSize} hóspede${
          maxSize === 1 ? ' pode ser adicionado' : 's podem ser adicionados'
        }.`;
      },
      NO_ADULT_GUESTS:
        'No momento de check-in, pelo menos um dos hóspedes necessita de ' +
        'ser adulto.'
    }
  }
};
