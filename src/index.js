import reset from './reset'
import debounce from 'lodash.debounce'

const rerenderRule = debounce((rule, selectors) =>
  rule.selector = selectors.join(',\n'))

export default function() {
  let sheet
  let resetRule
  const selectors = []
  return (rule) => {
    const { options } = rule
    if (!sheet && options.jss) {
      sheet = options.jss.createStyleSheet({}, {linked: true})
    }
    if (options.sheet.options.isolate === false) return
    if (options.sheet === sheet) return
    if (rule.type !== 'regular') return
    if (options.parent && options.parent.type === 'keyframe') return
    if (rule.style && rule.style.isolate === false) {
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
