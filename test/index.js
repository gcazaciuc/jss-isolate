'use strict'

QUnit.module('jss-isolate', {})

test('reset sheet is empty if there is nothing to reset', function () {
  var jssInstance = jss.create()
  var jssIsolate = new JssIsolate.default(jssInstance)
  jssInstance.use(jssIsolate.plugin())
  var sheet = jssInstance.createStyleSheet({}, {named: false})
  var resetSheet = jssIsolate.sheet()
  equal(resetSheet.toString(), '')
})

test('isolate ignores atRules', function () {
  var jssInstance = jss.create()
  var jssIsolate = new JssIsolate.default(jssInstance)
  jssInstance.use(jssIsolate.plugin())
  var sheet = jssInstance.createStyleSheet({
    '@media print': {},
    '@font-face': {
      'font-family': 'MyHelvetica',
      src: 'local("Helvetica")'
    },
    '@keyframes id': {
      from: {top: 0},
      '30%': {top: 30},
      '60%, 70%': {top: 80}
    },
    '@supports ( display: flexbox )': {},
  })
  var resetSheet = jssIsolate.sheet()
  equal(resetSheet.toString(), '')
    var jssIsolate = new JssIsolate.default(jss)
  jss.plugins.registry = []
})

test('works fine with classes', function () {
  var jssInstance = jss.create()
  var jssIsolate = new JssIsolate.default(jssInstance)
  jssInstance.use(jssIsolate.plugin())
  var sheet = jssInstance.createStyleSheet({
    '.link': {
      color: 'red'
    },
    '.link--item': {
      color: 'blue',
    }
  })
  var expected = '\
'+sheet.classes['.link']+',\n\
'+sheet.classes['.link--item']+' {\n\
  border-collapse: separate;\n\
  border-spacing: 0;\n\
  caption-side: top;\n\
  cursor: auto;\n\
  direction: ltr;\n\
  empty-cells: show;\n\
  font-family: serif;\n\
  font-size: medium;\n\
  font-style: normal;\n\
  font-variant: normal;\n\
  font-weight: normal;\n\
  font-stretch: normal;\n\
  line-height: normal;\n\
  hyphens: none;\n\
  letter-spacing: normal;\n\
  list-style: disc outside none;\n\
  tab-size: 8;\n\
  text-align: left;\n\
  text-align-last: auto;\n\
  text-indent: 0;\n\
  text-shadow: none;\n\
  text-transform: none;\n\
  visibility: visible;\n\
  white-space: normal;\n\
  widows: 2;\n\
  word-spacing: normal;\n\
}'
  equal(jssIsolate.sheet().resetSheet.toString(), expected)
  jss.plugins.registry = []
})

test('works in multiple stylesheets', function () {
  var jssInstance = jss.create()
  var jssIsolate = new JssIsolate.default(jssInstance)
  jssInstance.use(jssIsolate.plugin())
  var sheet1 = jssInstance.createStyleSheet({
    '.link--item': {
      color: 'blue',
    }
  })
  var sheet2 = jssInstance.createStyleSheet({
    '.link': {
      color: 'red'
    },
  })
  var resetSheet = jssIsolate.sheet()
  var renderedReset = resetSheet.toString()
  ok(renderedReset.indexOf(sheet1.classes['.link--item']) !==  -1)
  ok(renderedReset.indexOf(sheet2.classes['.link']) !==  -1)
  jss.plugins.registry = []
})




