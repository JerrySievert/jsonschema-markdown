var extend = require('extend');

function Generator (schema, options) {
  var defaults = {
    depth: 2,
    links: true
  };

  this.schema = schema;
  this.options = defaults;
  extend(this.options, options);
}

Generator.prototype.generate = function generate (schema) {
  var str = '';

  if (this.schema.id) {
    str += this.header(this.schema.id);
  }

  if (this.schema.description) {
    str += this.description(this.schema.description);
  }

  str += this.properties(this.schema.properties, this.schema.required);

  return str;
};

Generator.prototype.header = function header (text) {
  var str = '';

  for (var i = 0; i < this.options.depth; i++) {
    str += '#';
  }

  str += (' ' + text + '\n\n');

  return str;
};

Generator.prototype.description = function description (description) {
  return description + '\n';
};

Generator.prototype.properties = function properties (props, required) {
  var str = '*Properties:*\n\n';

  if (props === undefined || Object.keys(props).length === 0) {
    str += '_None._\n';
  } else {
    var keys = Object.keys(props);

    str += '| Property | Type | Description | Required |\n';
    str += '|-|-|-|-|\n';

    for (var i = 0; i < keys.length; i++) {
      str += ('| *' + keys[i] + '* | ' + this.type_description(keys[i], props[keys[i]]) + ' | ');
      // type goes here, with links
      str += ((props[keys[i]].description ? props[keys[i]].description : ' ') + '| ');
      str += ((required && required.indexOf(keys[i]) === -1 ? 'No' : 'Yes') + '|\n');
    }
  }

  return str;
};

Generator.prototype.type_description = function type_description (key, value) {
  if (this.options.links) {
    if (value.type === 'array') {
      if (value.items && value.items.$ref) {
        return '[' + key + '](#' + value.items.$ref + ')';
      }
    }
  }

  return value.type ? value.type : ' ';
};

module.exports = exports = Generator;
