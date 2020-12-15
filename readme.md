#simple-shadow-dom(ssd)
##What is ssd?
`web api`에 이미 구현되어 있는 <a href='https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM'>shadow dom</a>에 추가적인 메소드를 제공해서 보다 간편하게 shadow dom을 사용할수 있는 모듈입니다.

##Install
`npm i simple-shadow-dom`

##Basic usage
~~~javascript
import simpleShadowDom from 'simple-shadow-dom'

class Component extends simpleShadowDom {
  constructor() {
    super()

    ...
  }
}
~~~
##Methods
> <blank></blank>
> ✅ `simple-shadow-dom`은 기본 `web-api`를 확장했기 때문에 기존 메소드를 모두 활용할수 있습니다.
>https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM
> <blank></blank>
> <blank></blank>

###<b style='color: purple'>static</b> render
~~~javascript
Type: (rootElement, ssdClass, initTagName) => void
~~~
~~~javascript
  import simpleShadowDom from 'simple-shadow-dom'

  class Component extends simpleShadowDom {
      ...
  }

  const root = document.getElementById('root')

  simpleShadowDom.render(root, Component, 'shadow-component')
~~~
###<b style='color: purple'>static</b> setEachStyle
~~~javascript
Type: (cssTemplate) => void
~~~
~~~javascript
  const cssTemplate = `
    div {
      background: red;

      h1 {
        color: blue;
      }
    }
  `

  simpleShadowDom.setEachStyle(cssTemplate)
~~~
🔸 `ssd`로 생성한 모든 `shadow tree`에 작성한 `css`가 적용됩니다.
🔸 `nested css`가 지원됩니다.
🔺 `global css`와는 다르게 각각 컴포넌트에 `css`가 추가됩니다.

###<b style='color: #163D5C'>setTemplate</b>
~~~javascript
Type: (htmlTemplate) => void
~~~
~~~javascript
  import simpleShadowDom from 'simple-shadow-dom'

  const template = `
    <div>
      <h1>Hello World!</h1>
    </div>
  `

  class Component extends simpleShadowDom {
    constructor() {
      super()

      this.setTemplate(template)
      ...
    }
  }
~~~
🔸 현재 컴포넌트에 `template`을 저장합니다.
🔸 아래와 같이 변수를 받아 사용할수도 있습니다. 변수를 사용하는 방법은 <a href='#id'>setState</a> 참조

~~~javascript
  const template = (state) => `
    <div>
      <h1>${state}</h1>
    </div>
  `
~~~

###<b style='color: #163D5C'>setStyle</b>
~~~javascript
Type: (cssTemplate) => void
~~~
~~~javascript
  import simpleShadowDom from 'simple-shadow-dom'

  const cssTemplate = `
    div {
      background: red;

      h1 {
        color: blue;
      }
    }
  `

  class Component extends simpleShadowDom {
    constructor() {
      super()

      this.setStyle(cssTemplate)
      ...
    }
  }
~~~
🔸 현재 `shadow tree`에 작성한 `css`가 적용됩니다.
🔸 `nested css`가 지원됩니다.

###<b style='color: #163D5C'>setState</b>
~~~javascript
Type: (props) => void
~~~
~~~javascript
  import simpleShadowDom from 'simple-shadow-dom'

  const props = { text: 'text' }

  class Component extends simpleShadowDom {
    constructor() {
      super()

      this.setState(props)
      ...
    }
  }
~~~
🔸 <a>render</a>메소드가 실행될때 `props`를 만들어뒀던 `template`에 주입합니다.
🔸 `default props`는 `null`입니다.

###<b style='color: #163D5C'>render</b>
~~~javascript
Type: (props) => void
~~~
~~~javascript
  import simpleShadowDom from 'simple-shadow-dom'

  class Component extends simpleShadowDom {
    constructor() {
      super()

      ...
      this.render()
    }
  }
~~~
🔸 저장해놨던 `template`과 `css`, `props`를 이용해서 실제 돔에 `rendering`합니다.

##Dependencies
###css-flatten
- <a>https://github.com/fabiospampinato/css-flatten</a>
