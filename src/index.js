import reset from './reset'

export default function() {
  let sheet
  let resetRule
  const selectors = []
  return (rule) => {
    if (!sheet && rule.options.jss) {
      sheet = rule.options.jss.createStyleSheet({}, {linked: true})
    }
    if (rule.options.sheet === sheet) return
    if (!resetRule) {
      resetRule = sheet.createRule('reset', reset, {named: false})
      sheet.attach()
    }
    selectors.push(rule.selector)
    resetRule.selector = selectors.join(',\n')
  }
}
