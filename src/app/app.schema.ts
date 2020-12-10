import { RecordSchema, recordSchema } from '@lightweightform/storage';
import { reservationDetailsSchema } from './components/reservation-details/reservation-details.schema';
import { guestsSchema } from './components/guests/guests.schema';

/**
 * App schema.
 */
export const appSchema: RecordSchema = recordSchema({
  'reservation-details': reservationDetailsSchema,
  guests: guestsSchema
});
