import flatten from 'css-flatten';

export const minify = (css) =>
  css.trim().replace(/\s*(;|,|{|})\s*/g, '$1');

export const reduce = (fn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = fn(acc, a);
  }

  return acc;
};

export const go = (arg, ...fn) => reduce((acc, fn) => fn(acc), arg, fn);

export const curry = (fn) => (...arg) =>
  (arg.length >= fn.length) ? fn(...arg) : curry(fn.bind(null, ...arg));

export const pipe = (...fns) => (arg) => go(arg, ...fns);

export const minifyFlatten = pipe(flatten, minify);

export const setInnerHTML = curry((el, template) =>
  ((el.innerHTML = template), el));

export const setTextContent = curry((el, text) =>
  ((el.textContent = text), el));

export const createTemplate = curry((template, state) =>
  (typeof template === 'function') ? template(state) : template);

export const makeEl = (template) =>
  setInnerHTML(document.createElement('div'), template).children[0];

export const createEl = (type) =>
  document.createElement(type);

export const append = curry((parent, child) =>
  parent.appendChild(child));

export const remove = curry((parent, child) =>
  parent.removeChild(child));

export const matchTagName = (markup) => {
  const pattern = /<([^\s>]+)(\s|>)+/;
  return markup.match(pattern)[1];
};
