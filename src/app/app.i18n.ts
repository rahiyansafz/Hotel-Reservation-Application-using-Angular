import { I18N_EN_US, I18N_PT_PT } from '@lightweightform/bootstrap-theme';
import { LfI18n } from '@lightweightform/core';

import { appI18nEnUS } from './__i18n__/app.i18n.en-US';
import { appI18nPtPT } from './__i18n__/app.i18n.pt-PT';
import { reservationDetailsI18nEnUS } from './components/reservation-details/__i18n__/reservation-details.i18n.en-US';
import { reservationDetailsI18nPtPT } from './components/reservation-details/__i18n__/reservation-details.i18n.pt-PT';
import { guestsI18nEnUS } from './components/guests/__i18n__/guests.i18n.en-US';
import { guestsI18nPtPT } from './components/guests/__i18n__/guests.i18n.pt-PT';
import { guestI18nEnUS } from './components/guests/guest/__i18n__/guest.i18n.en-US';
import { guestI18nPtPT } from './components/guests/guest/__i18n__/guest.i18n.pt-PT';

/**
 * App i18n object.
 */
export const appI18n: Record<string, any> = {
  'en-US': LfI18n.mergeTranslations(
    I18N_EN_US,
    appI18nEnUS,
    reservationDetailsI18nEnUS,
    guestsI18nEnUS,
    guestI18nEnUS
  ),
  'pt-PT': LfI18n.mergeTranslations(
    I18N_PT_PT,
    appI18nPtPT,
    reservationDetailsI18nPtPT,
    guestsI18nPtPT,
    guestI18nPtPT
  )
};
