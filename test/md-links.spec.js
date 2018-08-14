const mdLinks = require('../index');

test('adds 1 + 2 to equal 3', () => {
  let options = {
    validate: false,
    stats: false
  }
  console.log(mdLinks('./src', options));
  expect(mdLinks('./src', options)).toBe(1);
});
