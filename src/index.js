import reset from './reset'

const debounce = (fn) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args))
  }
}

const setSelector = debounce((rule, selectors) =>
  rule.selector = selectors.join(',\n'))

export default function jssIsolate(options = {}) {
  let sheet
  let resetRule
  const selectors = []

  return (rule) => {
    if (rule.type !== 'regular') return
    if (rule.options.sheet === sheet) return
    if (rule.options.sheet.options.isolate === false) return
    if (rule.options.parent && rule.options.parent.type === 'keyframe') return
    if (rule.style && rule.style.isolate === false) {
      delete rule.style.isolate
      return
    }
    // Create a separate style sheet once and use it for all rules.
    if (!sheet && rule.options.jss) {
      sheet = rule.options.jss.createStyleSheet({}, {
        link: true,
        meta: 'jss-isolate'
      })
      const mergedReset = options.reset ? {...reset, ...options.reset} : reset
      resetRule = sheet.addRule('reset', mergedReset)
      sheet.attach()
    }
    if (selectors.indexOf(rule.selector) === -1) {
      selectors.push(rule.selector)
    }
    setSelector(resetRule, selectors)
  }
}
