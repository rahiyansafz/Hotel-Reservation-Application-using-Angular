import {
  RecordSchema,
  recordSchema,
  stringSchema,
  dateSchema,
  Storage,
  ValidationIssue
} from '@lightweightform/storage';
import { emailValidator } from '../../../utils/validators';

/**
 * Guest schema.
 */
export const guestSchema: RecordSchema = recordSchema({
  name: stringSchema({ minLength: 1, validate: unlikelyGuestName }),
  'document-type': stringSchema({
    isNullable: true,
    isRequired: true,
    allowedValues: ['passport', 'id']
  }),
  'document-number': stringSchema({ minLength: 1 }),
  'birth-date': dateSchema({
    isNullable: true,
    isRequired: true,
    maxDate: new Date()
  }),
  email: stringSchema({
    validate: (ctx: Storage) =>
      // Allow no e-mail
      ctx.get() === '' ? undefined : emailValidator(ctx)
  })
});

/**
 * Validate that the guest name is correct.
 * @param ctx Storage context.
 * @returns Validation issue with code `'UNLIKELY_NAME'` when the name of the
 * guest is unlikely to be correct.
 */
function unlikelyGuestName(ctx: Storage): ValidationIssue | undefined {
  if (ctx.get().length < 3) {
    return { code: 'UNLIKELY_NAME', isWarning: true };
  }
}
