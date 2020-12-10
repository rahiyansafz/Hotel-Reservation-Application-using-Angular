import { Storage, ValidationIssue } from '@lightweightform/storage';

/**
 * Regex used to validate an email.
 */
const EMAIL_REGEX = /^.+@.+$/;
/**
 * Regex used to validate a phone number (accepts spaces, dashes, and dots).
 */
const PHONE_NUMBER_REGEX = /^\+?[\d \-.]+$/;

/**
 * E-mail validator.
 * @param ctx Storage context.
 * @returns Validation issue with code `'INVALID_EMAIL'` when the e-mail is
 * invalid.
 */
export function emailValidator(ctx: Storage): ValidationIssue | undefined {
  const email = ctx.get();
  if (!EMAIL_REGEX.test(email)) {
    return { code: 'INVALID_EMAIL' };
  }
}

/**
 * Phone number validator.
 * @param ctx Storage context.
 * @returns Validation issue with code `'INVALID_PHONE_NUMBER'` when the phone
 * number is invalid.
 */
export function phoneNumberValidator(
  ctx: Storage
): ValidationIssue | undefined {
  const phoneNumber = ctx.get();
  if (!PHONE_NUMBER_REGEX.test(phoneNumber)) {
    return { code: 'INVALID_PHONE_NUMBER' };
  }
}
