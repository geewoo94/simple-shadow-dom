import {
  minify,
  reduce,
  go,
  curry,
  pipe,
  setInnerHTML,
  setTextContent,
  createTemplate,
  makeEl,
  createEl,
  append,
  remove,
  matchTagName,
} from '../src/utils';

describe('minify', () => {
  test('should return minify string from css', () => {
    const css = `
    h1 {
      color: black;
    }

    div {
      color: black;
    }
    `;
    const result = 'h1{color: black;}div{color: black;}';

    expect(minify(css)).toEqual(result);
  });
});

describe('reduce', () => {
  const add = (a, b) => a + b;
  const acc = 0;
  const arrayIter = [1, 2, 3];
  const setIter = [1, 2, 3];
  const result = 6;

  test('should return accumulated result', () => {
    expect(reduce(add, acc, arrayIter)).toEqual(result);
    expect(reduce(add, acc, setIter)).toEqual(result);
  });

  test('if args length is 2, iter`s first value will be acc', () => {
    expect(reduce(add, arrayIter)).toEqual(result);
  });
});

describe('go', () => {
  test('should return correct result', () => {
    const start = 10;
    const add10 = (num) => num + 10;
    const mult10 = (num) => num * 10;
    const minus10 = (num) => num - 10;
    const result = 190;

    expect(go(start, add10, mult10, minus10)).toEqual(result);
  });
});

describe('curry', () => {
  test('should return correct result', () => {
    const add = (a, b, c) => a + b + c;
    const curried = curry(add);
    const a = 10;
    const b = 20;
    const c = 30;
    const result = 60;

    expect(curried(a)(b)(c)).toEqual(result);
    expect(curried(a, b)(c)).toEqual(result);
    expect(curried(a)(b, c)).toEqual(result);
    expect(curried(a, b, c)).toEqual(result);
  });
});

describe('pipe', () => {
  test('should return correct result', () => {
    const add10 = (num) => num + 10;
    const mult10 = (num) => num * 10;
    const minus10 = (num) => num - 10;
    const piped = pipe(add10, mult10, minus10);
    const start = 10;
    const result = 190;

    expect(piped(start)).toEqual(result);
  });
});

describe('setInnerHTML', () => {
  test('should return correct result', () => {
    const div = document.createElement('div');
    const text = 'text';
    const result = setInnerHTML(div, text);

    expect(div).toEqual(result);
    expect(div.innerHTML).toEqual(text);
  });
});

describe('setTextContent', () => {
  test('should return correct result', () => {
    const div = document.createElement('div');
    const text = 'text';
    const result = setTextContent(div, text);

    expect(div).toEqual(result);
    expect(div.textContent).toEqual(text);
  });
});

describe('createTemplate', () => {
  const val = 1;
  const functionTemplate = (val) => `
    <div>
      <h1>${val}</h1>
      div
    </div>
  `;
  const template = `
    <div>
      <h1>1</h1>
      div
    </div>
  `;

  test('should return string template', () => {
    const created = createTemplate(template, null);
    expect(created).toEqual(template);
  });

  test('should return string template with args', () => {
    const created = createTemplate(template, val);
    expect(created).toEqual(template);
  });

  test('should return string template lazy', () => {
    const created = createTemplate(functionTemplate);
    expect(created(1)).toEqual(template);
  });
});

describe('makeEl', () => {
  test('should return correct result', () => {
    const id = 'test-id';
    const text = 'test-text';
    const template = `
      <div id=${id}>${text}</div>
    `;
    const div = makeEl(template);

    expect(div.id).toEqual(id);
    expect(div.textContent).toEqual(text);
  });
});

describe('createEl', () => {
  test('should return correct result', () => {
    const tagName = 'DIV';
    const lowerTagName = 'div';

    const div = createEl(tagName);
    const div2 = createEl(lowerTagName);

    expect(div.tagName).toEqual(tagName);
    expect(div2.tagName).toEqual(tagName);
  });
});

describe('append', () => {
  test('should return correct result', () => {
    const parent = document.createElement('div');
    const firstChild = document.createElement('h1');
    const secondChild = document.createElement('h2');

    const result = append(parent, firstChild);
    const result2 = append(parent, secondChild);

    expect(result).toEqual(firstChild);
    expect(result2).toEqual(secondChild);

    expect(parent.firstChild).toEqual(firstChild);
    expect(parent.lastChild).toEqual(secondChild);
  });
});

describe('remove', () => {
  test('should return correct result', () => {
    const parent = document.createElement('div');
    const firstChild = document.createElement('h1');
    const secondChild = document.createElement('h2');

    parent.appendChild(firstChild);
    parent.appendChild(secondChild);

    const result = remove(parent, firstChild);

    expect(result).toEqual(firstChild);
    expect(parent.firstChild).toEqual(secondChild);
    expect(parent.children.length).toEqual(1);
  });
});

describe('matchTagName', () => {
  test('should return correct result', () => {
    const template = `
      <sample-tag>
        <div></div>
      </sample-tag>
    `;
    const result = 'sample-tag';

    expect(matchTagName(template)).toEqual(result);
  });
});
