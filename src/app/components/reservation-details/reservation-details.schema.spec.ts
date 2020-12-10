import { Storage } from '@lightweightform/storage';

import { appSchema } from '../../app.schema';

describe('Reservation details schema', () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new Storage(appSchema);
  });

  it('should have a valid path', () => {
    expect(storage.hasPath('/reservation-details')).toBe(true);
  });
});
