import { LfStorage } from '@lightweightform/core';

/**
 * Guests i18n object for the en-US locale.
 */
export const guestsI18nEnUS: Record<string, any> = {
  '/guests': {
    label: 'Guests',
    addRowActionText: 'Add guest',
    removeRowsActionText: 'Remove guests',
    noRowsText: 'No guests added.',
    columnLabels: {
      name: 'Guest name',
      navigation: 'Navigation'
    },
    navigateButtonLabel: 'Go to form',
    validations: {
      LF_SIZE_OUT_OF_BOUNDS: (ctx: LfStorage, { maxSize }) => {
        if (ctx.size() === 0) {
          return 'At least 1 guest must be added.';
        }
        return `Given the selected rooms, at most ${maxSize} guest${
          maxSize === 1 ? '' : 's'
        } may be added.`;
      },
      NO_ADULT_GUESTS:
        'At the time of the check-in, at least one guest must be an adult.'
    }
  }
};
