'use strict'

QUnit.module('jss-isolate', {
  setup: function () {
    jss.default.use(jssIsolate.default())
  },
  teardown: function() {
    jss.default.sheets.registry = []
    jss.default.plugins.registry = []
  }
})

var skip = function(){};

test('reset sheet is not created if there is nothing to reset', function () {
  jss.default.createStyleSheet()
  equal(jss.default.sheets.registry.length, 1)
})

skip('isolate ignores atRules', function () {
  var sheet = jss.default.createStyleSheet({
    '@media print': {},
    '@font-face': {
      'font-family': 'MyHelvetica',
      src: 'local("Helvetica")',
    },
    '@keyframes id': {
      from: {top: 0},
      '30%': {top: 30},
      '60%, 70%': {top: 80},
    },
    '@supports ( display: flexbox )': {},
  })
  equal(jss.default.sheets.registry[0].toString(), '')
})

test('works fine with classes', function () {
  var sheet = jss.default.createStyleSheet({
    link: {
      color: 'red',
    },
    linkItem: {
      color: 'blue',
    }
  })
  var resetSheet = jss.default.sheets.registry[0]
  var resetRule = resetSheet.rules.reset
  var expectedClasses = '.' + sheet.classes.link + ',\n.' + sheet.classes.linkItem
  ok(resetRule.selector.indexOf(sheet.classes.linkItem) !== -1)
  ok(resetRule.selector.indexOf(sheet.classes.link) !== -1)
  equal(resetRule.style['border-collapse'], 'separate')
  equal(resetRule.style['font-family'], 'serif')
})

test('works in multiple stylesheets', function () {
  var sheet1 = jss.default.createStyleSheet({
    linkItem: {
      color: 'blue',
    },
  })
  var sheet2 = jss.default.createStyleSheet({
    link: {
      color: 'red',
    },
  })
  var resetSheet = jss.default.sheets.registry[0]
  var resetRule = resetSheet.rules.reset
  ok(resetRule.selector.indexOf(sheet1.classes.linkItem) !== -1)
  ok(resetRule.selector.indexOf(sheet2.classes.link) !== -1)
})

test('ignores rules if they are ignored in stylesheet options', function ( assert ) {
  var done = assert.async()
  var sheet1 = jss.default.createStyleSheet({
    linkItem: {
      color: 'blue',
    },
  })
  var sheet2 = jss.default.createStyleSheet({
    link: {
      color: 'red',
    },
  }, {
    isolate: false,
  })
  setTimeout(function () {
    var resetSheet = jss.default.sheets.registry[0]
    var resetRule = resetSheet.rules.reset
    ok(resetRule.selector.indexOf(sheet1.classes.linkItem) !== -1)
    ok(resetRule.selector.indexOf(sheet2.classes.link) === -1)
    done()
  }, 0)
})

test('ignore rules if property isolate is set to false', function( assert ) {
  var done = assert.async()
  var sheet = jss.default.createStyleSheet({
    linkItem: {
      color: 'blue',
    },
    link: {
      color: 'red',
      isolate: false,
    },
  })
  setTimeout(function () {
    var resetSheet = jss.default.sheets.registry[0]
    var resetRule = resetSheet.rules.reset
    ok(resetRule.selector.indexOf(sheet.classes.linkItem) !== -1)
    ok(resetRule.selector.indexOf(sheet.classes.link) === -1)
    ok(sheet.rules.link.style.isolate === undefined )
    done()
  }, 0)
})
