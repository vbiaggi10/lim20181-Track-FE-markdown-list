const mdLinks = require('../index');

let options = {
  validate: false,
  stats: false
}

test('resolves to mdLinks(./src, options)', () => {
  return expect(Promise.resolve(mdLinks('./src', options))).resolves.toBe("C:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\index.md\thttp://www.sunat.gob.pe/\tLink a\t----\r\nC:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://nodejs.org/en/\tLink a\tNode.js\r\n");
});

test('resolves to mdLinks(./src/index.md, options)', () => {
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("./src/index.md\thttp://www.sunat.gob.pe/\tLink a\t----\r\n");
});

test('resolves to mdLinks(./src/index.md, options) -> options.validate = true && options.stats = false', () => {
  options.validate = true;
  options.stats = false;
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("./src/index.md\thttp://www.sunat.gob.pe/\tOK\t200\tLink a\t----\r\n");
});

test('resolves to mdLinks(./src/index.md, options) -> options.stats = true && options.validate = false', () => {
  options.stats = true;
  options.validate = false;
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("Directorio:\t./src/index.md\r\n\tLinks total:\t1\r\n\tLinks unicos:\t1\r\n");
});

test('resolves to mdLinks(./src/index.md, options) -> options.stats = true && options.validate = true', () => {
  options.stats = true;
  options.validate = true;
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("Directorio:\t./src/index.md\r\n\tLinks total:\t1\r\n\tLinks unicos:\t1\r\n\tLinks rotos:\t0\r\n");
});

test('mdLinks to be Promise', () => {
  return expect(mdLinks('./src/index.md', options)).toBeInstanceOf(Promise);
});

// test('resolves to mdLinks(./src, options)', () => {
//   // make sure to add a return statement
//   return expect(Promise.reject(new Error(mdLinks('./src', options)))).rejects.toThrow("ENOENT");
// });

// test('mdLinks(./srcd, options) to equal true', () => {
//   let options = {
//     validate: false,
//     stats: false
//   }
//   errorMsg = 'Archivo o carpeta no existe';
//   return expect(Promise.resolve(mdLinks('./srcd', options))).resolves.toBe('')
// });
