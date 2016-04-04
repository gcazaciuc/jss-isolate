import reset from './reset'

const reRule = /^\..+/

export default function() {
  let sheet
  let resetRule
  const selectors = []
  function jssIsolate(rule) {
    if (!sheet && rule.options.jss) {
      sheet = rule.options.jss.createStyleSheet()
      jssIsolate.sheet = sheet
    }
    if (rule.options.sheet === sheet) return
    if (rule.type !== 'regular' || !(reRule.test(rule.selector))) {
      return
    }
    if (!resetRule) {
      resetRule = sheet.createRule('reset', reset, {named: false})
    }
    selectors.push(rule.selector)
    resetRule.selector = selectors.join(',\n')
    sheet.attach()
    sheet.deploy()
  }
  return jssIsolate
}
