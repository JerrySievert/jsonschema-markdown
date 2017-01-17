var test = require('tape');

var parser = require('../lib/parser');

var simple = require('./fixtures/simple.json');
var part1 = require('./fixtures/part1.json');
var part2 = require('./fixtures/part2.json');

test('parsing a simple example', function (t) {
  t.plan(1);

  var parsed = new parser(simple, { });

  var str = parsed.generateMarkdown();

  t.equal(str, '## Test Title\n\nA Description\n*Properties:*\n\n| Property | Type | Description | Required |\n|-|-|-|-|\n| *id* | number |  | No|\n| *key* | string |  | Yes|\n| *value* | string |  | Yes|\n');
});

test('setting depth to 1', function (t) {
  t.plan(1);

  var parsed = new parser(simple, { depth: 1 });

  var str = parsed.generateMarkdown();

  t.equal(str, '# Test Title\n\nA Description\n*Properties:*\n\n| Property | Type | Description | Required |\n|-|-|-|-|\n| *id* | number |  | No|\n| *key* | string |  | Yes|\n| *value* | string |  | Yes|\n');
});

test('having multiple schemas', function (t) {
  t.plan(1);

  var parsed = new parser(part1, { });
  parsed.addSchema(part2);

  var str = parsed.generateMarkdown();

  t.equal(str, '## /Datasource\n\n*Properties:*\n\n| Property | Type | Description | Required |\n|-|-|-|-|\n| *id* | string | primary key| No|\n| *tablename* | string | table name| Yes|\n| *url* | string | location of original resource| Yes|\n| *name* | string | human readable name| No|\n| *headers* | [headers](#/TableHeader) |  | No|\n## /TableHeader\n\n*Properties:*\n\n| Property | Type | Description | Required |\n|-|-|-|-|\n| *label* | string |  | Yes|\n| *inferred_type* | string |  | No|\n| *override_type* | string |  | No|\n');
});
