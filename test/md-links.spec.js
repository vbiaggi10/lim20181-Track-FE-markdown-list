const mdLinks = require('../index');

const options = {
  validate: false,
  stats: false
}

test('resolves to mdLinks(./src, options)', () => {
  const options = {
    validate: false,
    stats: false
  }
  // return expect(Promise.resolve(mdLinks('./src', options))).resolves.toBe("C:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\index.md\thttp://www.sunat.gob.pe/\tLink a\t----\r\nC:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://otra-cosa.net/algun-doc.html\tLink a\t----\r\nC:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://otra-cosa.net/algun-doc.html\tLink a\t----\r\nC:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://nodejs.org/en/\tLink a\tNode.js\r\nC:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://nodejs.org/en/asdddddjjjajaaj\tLink a\tNode.js\r\nC:\\Users\\Valeria Biaggi\\Documents\\GitHub\\lim20181-Track-FE-markdown-list\\src\\hola.md\thttps://nodejs.org/en/asdddddjjjajaaj\tLink a\tNode.js\r\n");
  return expect(Promise.resolve(mdLinks('./src', options))).resolves.toBe("D:\\Users\\valer\\Documents\\Laboratoria\\GitHub\\lim20181-Track-FE-markdown-list\\src\\index.md\thttp://www.sunat.gob.pe/\tLink a\t----\r\nD:\\Users\\valer\\Documents\\Laboratoria\\GitHub\\lim20181-Track-FE-markdown-list\\src\\hola\\hola.md\thttps://nodejs.org/en/asdddddjjjajaaj\tLink a\tNode.js\r\nD:\\Users\\valer\\Documents\\Laboratoria\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://otra-cosa.net/algun-doc.html\tLink a\t----\r\nD:\\Users\\valer\\Documents\\Laboratoria\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://otra-cosa.net/algun-doc.html\tLink a\t----\r\nD:\\Users\\valer\\Documents\\Laboratoria\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://nodejs.org/en/\tLink a\tNode.js\r\nD:\\Users\\valer\\Documents\\Laboratoria\\GitHub\\lim20181-Track-FE-markdown-list\\src\\readme.md\thttps://nodejs.org/en/asdddddjjjajaaj\tLink a\tNode.js\r\n");
});

test('resolves to mdLinks(./src/index.md, options)', () => {
  const options = {
    validate: false,
    stats: false
  }
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("./src/index.md\thttp://www.sunat.gob.pe/\tLink a\t----\r\n");
});

// test('resolves to mdLinks(./src/indexaaa.md, options)', () => {
//   return expect(Promise.resolve(mdLinks('./src/indexaaa.md', options))).resolves.toBe("./src/index.md\thttp://www.sunat.gob.pe/\tLink a\t----\r\n");
// });

test('rejects to octopus', () => {
  const options = {
    validate: false,
    stats: false
  }
  return expect(Promise.reject(new Error(mdLinks('./src/indexaaa.md', options)))).rejects.toThrow(
<<<<<<< HEAD
    'ENNOUT'
=======
    'ENNOUT',
>>>>>>> 610d42805fd6eedd8f7c47b3ade42a374850e5bf
  );
});

test('rejects to octopus', () => {
  const options = {
    validate: false,
    stats: false
  }
  return expect(Promise.reject(new Error(mdLinks('./srcdd/', options)))).rejects.toThrow(
<<<<<<< HEAD
    'ENNOUT'
=======
    'ENNOUT',
>>>>>>> 610d42805fd6eedd8f7c47b3ade42a374850e5bf
  );
});

test('resolves to mdLinks(./src/hola.md, options)', () => {
  const options = {
    validate: false,
    stats: false
  }
  return expect(Promise.resolve(mdLinks('./src/hola/hola.md', options))).resolves.toBe("./src/hola/hola.md\thttps://nodejs.org/en/asdddddjjjajaaj\tLink a\tNode.js\r\n");
});

// test('resolves to mdLinks(./src/hola.md, options)', () => {
//   return expect(Promise.resolve(mdLinks('./src/hola.md', options))).resolves.toBe("./src/hola.md\thttps://nodejs.org/en/asdddddjjjajaaj\tLink a\tNode.js\r\n");
// });

test('resolves to mdLinks(./src/index.md, options) -> options.validate = true && options.stats = false', () => {
  const options = {
    validate: true,
    stats: false
  }
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("./src/index.md\thttp://www.sunat.gob.pe/\tOK\t200\tLink a\t----\r\n");
});

test('resolves to mdLinks(./src/readme.md, options) -> options.validate = true && options.stats = false', () => {
  const options = {
    validate: true,
    stats: false
  }
  return expect(Promise.resolve(mdLinks('./src/readme.md', options))).resolves.toBe("./src/readme.md\thttps://otra-cosa.net/algun-doc.html\tENOTFOUND\r\n./src/readme.md\thttps://otra-cosa.net/algun-doc.html\tENOTFOUND\r\n./src/readme.md\thttps://nodejs.org/en/\tOK\t200\tLink a\tNode.js\r\n./src/readme.md\thttps://nodejs.org/en/asdddddjjjajaaj\tNot Found\t404\tLink a\tNode.js\r\n");
});

test('resolves to mdLinks(./src/index.md, options) -> options.stats = true && options.validate = false', () => {
  const options = {
    validate: false,
    stats: true
  }
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("Directorio:\t./src/index.md\r\n\tLinks total:\t1\r\n\tLinks unicos:\t1\r\n");
});

test('resolves to mdLinks(./src/index.md, options) -> options.stats = true && options.validate = true', () => {
  const options = {
    validate: true,
    stats: true
  }
  return expect(Promise.resolve(mdLinks('./src/index.md', options))).resolves.toBe("Directorio:\t./src/index.md\r\n\tLinks total:\t1\r\n\tLinks unicos:\t1\r\n\tLinks rotos:\t0\r\n");
});

test('resolves to mdLinks(./src/readme.md, options) -> options.stats = true && options.validate = true', () => {
  const options = {
    validate: true,
    stats: true
  }
  return expect(Promise.resolve(mdLinks('./src/readme.md', options))).resolves.toBe("Directorio:\t./src/readme.md\r\n\tLinks total:\t4\r\n\tLinks unicos:\t3\r\n\tLinks rotos:\t1\r\n");
});

test('mdLinks to be Promise', () => {
  return expect(mdLinks('./src/index.md', options)).toBeInstanceOf(Promise);
});
