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
	// all atRules will be ignored in reset
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
		isolate: false, // this rule will be ignored in reset
	}
})

// this stylesheet will be ignored in reset
const sheet2 = jss.createStyleSheet({
	...
}, {isolate: false})

```
**Stylesheet**
```css
@font-face {
  font-family: MyHelvetica;
  src: local("Helvetica");
}
.title--jss-0-1 {
  font-size: 20px;
  background: #f00;
}
.link--jss-0-2 {
  font-size: 12px;
}
.article--jss-0-3 {
  margin: 20px 10px 30px;
}
```
**Reset stylesheet**. If need to get access to it use [jss.sheets registry](
https://github.com/jsstyles/jss/blob/master/docs/js-api.md#a-style-sheets-registry).
There are no reasons to access it in the most of the situations. It will be generated and attached to document automatically. But you can.
```css
.title--jss-0-1,
.link--jss-0-2 {
  border-collapse: separate;
  border-spacing: 0;
  caption-side: top;
  cursor: auto;
  direction: ltr;
  empty-cells: show;
  font-family: serif;
  font-size: medium;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  line-height: normal;
  hyphens: none;
  letter-spacing: normal;
  list-style: disc outside none;
  tab-size: 8;
  text-align: left;
  text-align-last: auto;
  text-indent: 0;
  text-shadow: none;
  text-transform: none;
  visibility: visible;
  white-space: normal;
  widows: 2;
  word-spacing: normal;
}
```

## Run tests

```bash
npm i
npm run test
```

## License

MIT
