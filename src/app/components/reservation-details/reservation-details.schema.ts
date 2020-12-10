import {
  RecordSchema,
  recordSchema,
  stringSchema,
  numberSchema,
  booleanSchema,
  tableSchema,
  Storage,
  ValidationIssue
} from '@lightweightform/storage';
import { dateRangeSchema } from '@lightweightform/bootstrap-theme';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { emailValidator, phoneNumberValidator } from '../../utils/validators';
import { ROOM_PRICES } from '../../utils/constants';

/**
 * Reservation details schema.
 */
export const reservationDetailsSchema: RecordSchema = recordSchema({
  name: stringSchema({ minLength: 1 }),
  email: stringSchema({ minLength: 1, validate: emailValidator }),
  'phone-number': stringSchema({
    minLength: 1,
    validate: phoneNumberValidator
  }),
  'check-in-out': dateRangeSchema({
    isNullable: true,
    isRequired: true,
    minDate: new Date(new Date().toJSON().slice(0, 10)), // Today (not "now")
    validate: checkInOutAtLeastOneNight
  }),
  'check-in-hour': numberSchema({
    isNullable: true,
    isInteger: true,
    min: 16,
    max: 23
  }),
  'special-requests': stringSchema(),
  rooms: tableSchema(
    recordSchema({
      type: stringSchema({
        isNullable: true,
        isRequired: true,
        allowedValues: ['single', 'double', 'twin']
      }),
      price: numberSchema({ isNullable: true, computedValue: roomPrice }),
      'smoking-room': booleanSchema()
    }),
    { minSize: 1, initialValue: [{ type: 'single' }] }
  ),
  'amount-per-night': numberSchema({
    isNullable: true,
    computedValue: amountPerNight
  }),
  'nights-spent': numberSchema({
    isNullable: true,
    isInteger: true,
    computedValue: nightsSpent
  }),
  'total-amount': numberSchema({ isNullable: true, computedValue: totalAmount })
});

/**
 * Validate that the check-in and check-out aren't in the same day.
 * @param ctx Storage context.
 * @returns Validation issue with code `'CHECK_IN_OUT_SAME_DAY'` when the
 * check-in and check-out are on the same day.
 */
function checkInOutAtLeastOneNight(ctx: Storage): ValidationIssue | undefined {
  if (ctx.get('../nights-spent') < 1) {
    return { code: 'CHECK_IN_OUT_SAME_DAY' };
  }
}

/**
 * Price of a room.
 * @param ctx Storage instance.
 * @returns Price of a room or `null` when the room type isn't known.
 */
function roomPrice(ctx: Storage): number | null {
  const roomType = ctx.get('type');
  return roomType === null ? null : ROOM_PRICES[roomType];
}

/**
 * Amount to pay per night.
 * @param ctx Storage instance.
 * @returns Amount to pay per night or `null` when information is missing.
 */
function amountPerNight(ctx: Storage): number | null {
  const rooms = ctx.get('rooms');
  return rooms.length === 0
    ? null
    : rooms.reduce(
        (sum, room) =>
          sum === null || room.price === null ? null : sum + room.price,
        0
      );
}

/**
 * Number of nights spent from check-in to check-out.
 * @param ctx Storage instance.
 * @returns Number of nights spent or `null` when no dates have been provided.
 */
function nightsSpent(ctx: Storage): number | null {
  const range = ctx.get('check-in-out');
  return range === null ? null : differenceInCalendarDays(range[1], range[0]);
}

/**
 * Total amount to be paid.
 * @param ctx Storage instance.
 * @returns Total amount to pay or `null` when information is missing.
 */
function totalAmount(ctx: Storage): number | null {
  const nNights = ctx.get('nights-spent');
  const perNight = ctx.get('amount-per-night');
  return nNights === null || perNight === null ? null : nNights * perNight;
}
