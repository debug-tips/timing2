import { expect } from 'chai';
import getTime from '../src/index';

describe('basic', () => {
  it('should work', () => {
    const result = getTime({ type: 'page' });
    expect(result).to.be.empty;
  });
});
