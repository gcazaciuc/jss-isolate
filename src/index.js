const reset = {
  'border-collapse': 'separate',
  'border-spacing': '0',
  'caption-side': 'top',
  'cursor': 'auto',
  'direction': 'ltr',
  'empty-cells': 'show',
  'font-family': 'serif',
  'font-size': 'medium',
  'font-style': 'normal',
  'font-variant': 'normal',
  'font-weight': 'normal',
  'font-stretch': 'normal',
  'line-height': 'normal',
  'hyphens': 'none',
  'letter-spacing': 'normal',
  'list-style': 'disc outside none',
  'tab-size': '8',
  'text-align': 'left',
  'text-align-last': 'auto',
  'text-indent': '0',
  'text-shadow': 'none',
  'text-transform': 'none',
  'visibility': 'visible',
  'white-space': 'normal',
  'widows': 2,
  'word-spacing': 'normal',
}

export default class JssIsolate {
  constructor(jss, reRule = /^\..+/) {
    this._reRule = reRule
    this._sheet = jss.createStyleSheet()
    this._rules = []
    this._rule = null
  }

  plugin() {
    return (rule) => {
      if (rule.options.sheet === this._sheet) return
      if (rule.type !== 'regular' || !(this._reRule.test(rule.selector))) {
        return
      }
      this._rules.push(
        rule.selector.replace('.', '')
      )
      if (!this._rule) {
        this._rule = this._sheet.createRule(rule.name, reset)
      }
      this._rule.selector = this._rules.join(',\n')
    }
  }

  sheet() {
    return this._sheet
  }
}