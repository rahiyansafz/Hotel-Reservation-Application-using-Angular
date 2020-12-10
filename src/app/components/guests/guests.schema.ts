import {
  TableSchema,
  tableSchema,
  Storage,
  ValidationIssue
} from '@lightweightform/storage';
import isBefore from 'date-fns/isBefore';
import subYears from 'date-fns/subYears';

import { guestSchema } from './guest/guest.schema';
import { MAX_ROOM_GUESTS, ADULT_AGE } from '../../utils/constants';

/**
 * Guests schema.
 */
export const guestsSchema: TableSchema = tableSchema(guestSchema, {
  minSize: 1,
  maxSize: maxNumberOfGuests,
  validate: adultGuestExists,
  initialValue: [{}]
});

/**
 * Maximum number of guests.
 * @param ctx Storage instance.
 * @returns Maximum number of guests or `null` if there is missing information.
 */
function maxNumberOfGuests(ctx: Storage): number | null {
  const rooms = ctx.get('/reservation-details/rooms');
  return rooms.length === 0
    ? null
    : rooms.reduce(
        (sum, room) =>
          sum === null || room.type === null
            ? null
            : sum + MAX_ROOM_GUESTS[room.type],
        0
      );
}

/**
 * Validation function that checks that there is at least one adult guest at the
 * time of the check-in.
 * @param ctx Storage instance.
 * @returns Validation issue with code `'NO_ADULT_GUESTS'` when there are no
 * adult guests.
 */
function adultGuestExists(ctx: Storage): ValidationIssue | undefined {
  const guests = ctx.get();
  const checkInOut = ctx.get('/reservation-details/check-in-out');
  if (
    checkInOut !== null &&
    guests.length > 0 &&
    guests.every(
      guest =>
        // Guest birth date >= check-in date - 18 years = guest is a child
        !isBefore(guest['birth-date'], subYears(checkInOut[0], ADULT_AGE))
    )
  ) {
    return { code: 'NO_ADULT_GUESTS' };
  }
}
