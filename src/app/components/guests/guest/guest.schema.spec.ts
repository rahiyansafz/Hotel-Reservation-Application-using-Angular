import { Storage } from '@lightweightform/storage';

import { appSchema } from '../../../app.schema';

describe('Guest schema', () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new Storage(appSchema);
  });

  it('should have a valid path', () => {
    expect(storage.hasPath('/guests/?')).toBe(true);
  });
});
