import { expect } from 'chai';
import getTime from '../src';

describe('basic', () => {
  it('should work', () => {
    const result = getTime({ type: 'page' });
    expect(result).to.be.empty;
  });
});
