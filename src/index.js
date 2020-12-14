import {
  go,
  minifyFlatten,
  setTextContent,
  createTemplate,
  makeEl,
  createEl,
  append,
  remove,
  matchTagName,
} from './utils';

export default class simpleShadowDom extends HTMLElement {
  static render(root, shadowClass, tagName) {
    if (tagName[0] === '<') {
      go(makeEl(tagName),
        append(root));
      customElements.define(matchTagName(tagName), shadowClass);
    } else {
      go(createEl(tagName),
        append(root));
      customElements.define(tagName, shadowClass);
    }
  }

  static setEachStyle(css) {
    if (!css) return;
    simpleShadowDom._eachStyle = minifyFlatten(css);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._template = null;
    this._el = null;
    this._styleEl = null;
    this._state = null;
    this._isRendered = false;
  }

  setTemplate(template) {
    this._template = template;
  }

  _setStyleEl(style) {
    this._styleEl = style;
  }

  setStyle(css) {
    const eachStyle = simpleShadowDom._eachStyle || '';

    go(minifyFlatten(css + eachStyle),
      setTextContent(createEl('style')),
      append(this.shadowRoot));
  }

  setState(state) {
    this._state = (typeof state === 'function') ? state(this._state) : state;
    if (this._state === undefined) throw Error('Can not set undefined');
  }

  _setEl(el) {
    this._el = el;
    this._isRendered = true;
  }

  _render() {
    go(createTemplate(this._template, this._state),
      makeEl,
      append(this.shadowRoot),
      this._setEl.bind(this));
  }

  render() {
    (this._isRendered) ?
      (remove(this.shadowRoot, this._el), this._render.bind(this)()) :
      this._render.bind(this)();
  }
}
