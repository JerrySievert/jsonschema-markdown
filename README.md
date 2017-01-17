# JSON-Schema Markdown

A quick hack at generating Markdown from JSON-Schema.

## Usage

```
var Parser = require('jsonschema-markdown');

var generator = new Parser(schema, options);

var markdown = generator.generateMarkdown();
```

Or

```
var Parser = require('jsonschema-markdown');

var generator = new Parser(schema, options);

generator.addSchema(schema2); // add a linked schema

var markdown = generator.generateMarkdown();
```

_Options:_

* `depth` - depth of markdown header, defaults to `2`
* `links` - whether to try to make links for types, defaults to `true`
