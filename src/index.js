import reset from './reset'
import debounce from 'lodash.debounce'

const rerenderRule = debounce((rule, selectors) =>
  rule.selector = selectors.join(',\n'))

export default function() {
  let sheet
  let resetRule
  const selectors = []
  return (rule) => {
    if (!sheet && rule.options.jss) {
      sheet = rule.options.jss.createStyleSheet({}, {linked: true})
    }
    if (rule.options.sheet.options.isolate === false) return
    if (rule.options.sheet === sheet) return
    if (rule.type !== 'regular') return
    if (rule.style.isolate === false) {
      delete rule.style.isolate
      return
    }
    if (!resetRule) {
      resetRule = sheet.createRule('reset', reset, {named: false})
      sheet.attach()
    }
    selectors.push(rule.selector)
    rerenderRule(resetRule, selectors)
  }
}
