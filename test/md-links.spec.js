const mdLinks = require('../index');

let options = {
  validate: false,
  stats: false
}

test('resolves to mdLinks(./src, options)', () => {
  return expect(Promise.resolve(mdLinks('./src', options))).resolves.toBe("C:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\index.md\thttp://www.sunat.gob.pe/\tLink a\t----\r\nC:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\index.md\thttps://nodejs.org/en/\tLink a\tNode.js\r\n");
});

test('resolves to mdLinks(./src/index.md, options)', () => {
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("./src/index.md\thttp://www.sunat.gob.pe/\tLink a\t----\r\n");
});

// expect(mdLinks('./src/index.md', options)).toBeInstanceOf(Promise);

// test('rejects to octopus', async () => {
//   await expect(Promise.reject(new Error(mdLinks('./srcd', options)))).rejects.toThrow('ENOENT');
// });

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
