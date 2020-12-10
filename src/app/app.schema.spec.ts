import { Storage } from '@lightweightform/storage';

import { appSchema } from './app.schema';

describe('App schema', () => {
  let storage: Storage;

  beforeEach(() => {
    storage = new Storage(appSchema);
  });

  it('should get the root value', () => {
    expect(storage.get('/')).toBeTruthy();
  });
});
