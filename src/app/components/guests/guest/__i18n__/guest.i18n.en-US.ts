import { LfStorage } from '@lightweightform/core';

/**
 * Guest i18n object for the en-US locale.
 */
export const guestI18nEnUS: Record<string, any> = {
  '/guests/?': {
    label: (ctx: LfStorage) => ctx.get('name') || '[No name]'
  },
  '/guests/?/name': {
    label: 'Full name',
    legend:
      'Please make sure that the name is correct according to the provided ' +
      'document, or we will not be able to accept the guest.',
    validations: {
      UNLIKELY_NAME:
        'Please note that we will not be able to accept the guest if the ' +
        'provided name is not correct.'
    }
  },
  '/guests/?/document-type': {
    label: 'Document type',
    options: [
      { value: 'passport', label: 'Passport' },
      { value: 'id', label: 'Id card' }
    ]
  },
  '/guests/?/document-number': {
    label: 'Document number'
  },
  '/guests/?/birth-date': {
    label: 'Date of birth'
  },
  '/guests/?/email': {
    label: 'E-mail',
    validations: {
      INVALID_EMAIL: 'The e-mail is invalid.'
    }
  }
};
