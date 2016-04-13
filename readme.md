![JSS logo](https://avatars1.githubusercontent.com/u/9503099?v=3&s=60)

## True rules isolation through automatic inheritable properties reset.

There is a category of css properties named 'inheritable'. It means that these properties apply to the child nodes from parent nodes. See [this article](
https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Cascading_and_inheritance) for more details.

Due to this reason styles in reusable UI components can be broken if all inheritable properties were not defined explicitly for each element. It can cost You extra efforts to build strong isolation in a component.

This plugin protects styles from inheritance. It automatically creates a reset rule and applies it to every user's rule.

[Demo](http://jsstyles.github.io/examples/index.html#plugin-jss-isolate) -
[JSS](https://github.com/jsstyles/jss)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/jsstyles/jss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Usage example

```javascript
import jss from 'jss'
import jssIsolate from 'jss-isolate'

jss.use(jssIsolate())

const sheet = jss.createStyleSheet({
	// All atRules will be ignored in reset.
	'@font-face': {
		'font-family': 'MyHelvetica',
		src: 'local("Helvetica")',
	},
	title: {
		'font-size': '20px',
		background: '#f00',
	},
	link: {
		'font-size': '12px',
	},
	article: {
		margin: '20px 10px 30px',
		isolate: false // This rule will be ignored in reset.
	}
})

```

## Disable isolation locally.

There are 2 ways to avoid isolation if you want to.

1. For a rule

```javascript
export default {
  button: {
    isolate: false
  }
}
```

2. For a style sheet

```javascript
jss.createStyleSheet(styles, {isolate: false})
```

## Additional reset.

If you want to pass additional properties that need to be resetted.

```javascript
jss.use(jssIsolate({
  reset: {
    boxSizing: 'border-box'
  }
}))
```

## Run tests

```bash
npm i
npm run test
```

## License

MIT
