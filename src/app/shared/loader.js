import "../../css/loader.css";
import Div from "./div";

export default class Loader {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    const loader = new Div({ class: this.params.class }).element;

    return loader;
  }
}
