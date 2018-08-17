const mdLinks = require('../index');

test('mdLinks(./src, options) to equal true', () => {
  let options = {
    validate: false,
    stats: false
  }
  expect(mdLinks('./src', options)).toBe(true);
});

test('mdLinks(./src/index.md, options) to equal true', () => {
  let options = {
    validate: false,
    stats: false
  }
  expect(mdLinks('./src/index.md', options)).toBe(true);
});

test('mdLinks(./srcd, options) to equal true', () => {
  let options = {
    validate: false,
    stats: false
  }
  errorMsg = 'Archivo o carpeta no existe';
  expect(mdLinks('./srcd', options)).toBe(true);
});
