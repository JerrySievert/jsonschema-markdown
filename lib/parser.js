var generator = require('./generator');

function Parser (schema, options) {
  this.baseSchema = schema;
  this.options = options;
  this.schemas = [ ];
}

Parser.prototype.addSchema = function addSchema (schema) {
  this.schemas.push(schema);
};

Parser.prototype.generateMarkdown = function generateMarkdown ( ) {
  var gen;
  var str = '';

  if (this.baseSchema) {
    gen = new generator(this.baseSchema, this.options);
    str += gen.generate();
  }

  this.schemas.forEach(function (e, i, a) {
    gen = new generator(e, this.options);

    str += gen.generate();
  });

  return str;
};

module.exports = exports = Parser;
