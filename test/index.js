const expect = require('chai').expect;
const timing2 = require('../lib');

describe('get metrics', () => {
  it('should not throw when no performance', () => {
    expect(timing2).to.be.undefined;
  });

  it('should work', () => {
    global.window = {};
    global.window.location = {};
    global.window.performance = {};
    global.window.performance.timing = {};
    global.window.performance.navigation = {};
    delete require.cache[require.resolve('../lib')];
    const timing2 = require('../lib');
    expect(timing2).to.be.an('object');
  });
});
