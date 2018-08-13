import lodash from 'lodash';
exports.printMsg = function() {
    console.log('This msg is from boilerplate');
}

const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", {
    validate: true
  })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/example.md", {
    stats: true
  })
  .then(links => {
    // => [{ href, text, file, total, unique, domains }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);