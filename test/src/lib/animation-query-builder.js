import assert from 'assert';

import {
  createSlashQuery,
  createCrossedSlashQuery,
} from 'src/lib/animation-query-builder';


describe('src/lib/animation-query-builder', () => {

  it('createSlashQuery', () => {
    const query = createSlashQuery();
    assert(query.length > 0);
  });

  it('createCrossedSlashQuery', () => {
    const query = createCrossedSlashQuery();
    assert(query.length > 0);
  });
});
