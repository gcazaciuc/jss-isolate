import reset from './reset'

const reRule = /^\..+/

export default function() {
  let sheet
  let resetRule
  const selectors = []
  return (rule) => {
    if (!sheet && rule.options.jss) {
      sheet = rule.options.jss.createStyleSheet()
    }
    if (rule.options.sheet === sheet) return
    if (rule.type !== 'regular' || !(reRule.test(rule.selector))) {
      return
    }
    if (!resetRule) {
      resetRule = sheet.createRule('reset', reset, {named: false})
      sheet.attach()
    }
    selectors.push(rule.selector)
    resetRule.selector = selectors.join(',\n')
    sheet.deploy()
  }
}
