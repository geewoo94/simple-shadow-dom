declare module 'simple-shadow-dom' {
  export default class simpleShadowDom extends HTMLElement {
    static render: (root: HTMLElement, shadowClass: simpleShadowDom, tagName: string) => void;

    static setEachStyle: (css: string) => void

    setTemplate: (template: string | ((...props: any) => string)) => void;

    setStyle: (css: string) => void;

    setState: (...state: any) => void;

    render: () => void;
  }
}
