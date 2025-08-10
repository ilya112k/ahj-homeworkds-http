import "../../css/checkbox.css";

import Div from "./div";
import Label from "./label";

export default class Checkbox {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    this.ticketCheckboxContainer = new Div({
      class: this.params.classContainer,
    }).element;
    this.checkboxTicket = document.createElement("input");
    this.labelCheckbox = new Label({ class: this.params.classLabel }).element;

    this.checkboxTicket.classList.add(this.params.classCheckbox);
    this.checkboxTicket.type = "checkbox";
    this.checkboxTicket.id = this.params.checkboxId;
    this.checkboxTicket.checked = this.params.status;
    this.labelCheckbox.htmlFor = this.params.checkboxId;

    this.ticketCheckboxContainer.append(
      this.checkboxTicket,
      this.labelCheckbox,
    );

    return this.ticketCheckboxContainer;
  }
}
