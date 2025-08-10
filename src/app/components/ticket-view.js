import Checkbox from "../shared/checkbox";
import Div from "../shared/div";
import Heading from "../shared/heading";
import Button from "../shared/button";
import Time from "../shared/time";

export default class TicketView {
  constructor(container) {
    this.container = container;
  }

  bindToDOMListTickets(data) {
    const listTickets = new Div({ class: "tickets-list" }).element;

    data.forEach((el) => {
      this.bindToDOMTicket(listTickets, el);
    });

    const ticketsContainer = new Div({ class: "tickets-container" }).element;

    this.bindToDOMAddBtnTicket(ticketsContainer);

    ticketsContainer.append(listTickets);
    this.container.appendChild(ticketsContainer);
  }

  bindToDOMAddBtnTicket(parentEl) {
    const addBtn = new Button({
      class: "add-ticket-btn",
      text: "Добавить тикет",
      type: "button",
    }).element;

    parentEl.appendChild(addBtn);
  }

  bindToDOMTicket(parentEl, data) {
    const ticketContainer = new Div({ class: "ticket-container", id: data.id })
      .element;
    const ticketContentShort = new Div({ class: "ticket-content-short" })
      .element;
    const ticketCheckboxTitle = new Div({ class: "ticket-checkbox-title" })
      .element;
    const ticketCheckbox = new Checkbox({
      classCheckbox: "checkbox-ticket",
      classContainer: "ticket-checkbox-container",
      classLabel: "checkbox-label",
      checkboxId: `checkbox-ticket-${data.id}`,
      status: data.status,
    }).element;
    const titleTicket = new Heading({
      class: "title-ticket",
      text: data.name,
      level: 3,
    }).element;
    const timeActionsTicket = new Div({ class: "time-actions-ticket" }).element;
    const ticketTime = new Time({
      class: "ticket-time",
      dateCreated: data.created,
    }).element;
    const ticketActions = new Div({ class: "ticket-actions" }).element;
    const btnEdit = new Button({ class: "btn-edit", text: "✎", type: "button" })
      .element;
    const btnRemove = new Button({
      class: "btn-remove",
      text: "x",
      type: "button",
    }).element;

    ticketContainer.append(ticketContentShort);
    ticketContentShort.append(ticketCheckboxTitle, timeActionsTicket);
    ticketCheckboxTitle.append(ticketCheckbox, titleTicket);
    timeActionsTicket.append(ticketTime, ticketActions);
    ticketActions.append(btnEdit, btnRemove);

    parentEl.appendChild(ticketContainer);
  }

  bindToDOMUpdateTicket(parentEl, data) {
    const ticketContainer = parentEl.querySelector(".ticket-container");

    ticketContainer.innerHTML = "";

    if (ticketContainer.id === data.id) {
      const ticketContentShort = new Div({ class: "ticket-content-short" })
        .element;
      const ticketCheckboxTitle = new Div({ class: "ticket-checkbox-title" })
        .element;
      const ticketCheckbox = new Checkbox({
        classCheckbox: "checkbox-ticket",
        classContainer: "ticket-checkbox-container",
        classLabel: "checkbox-label",
        checkboxId: `checkbox-ticket-${data.id}`,
        status: data.status,
      }).element;
      const titleTicket = new Heading({
        class: "title-ticket",
        text: data.name,
        level: 3,
      }).element;
      const timeActionsTicket = new Div({ class: "time-actions-ticket" })
        .element;
      const ticketTime = new Time({
        class: "ticket-time",
        dateCreated: data.created,
      }).element;
      const ticketActions = new Div({ class: "ticket-actions" }).element;
      const btnEdit = new Button({
        class: "btn-edit",
        text: "✎",
        type: "button",
      }).element;
      const btnRemove = new Button({
        class: "btn-remove",
        text: "x",
        type: "button",
      }).element;

      ticketContainer.append(ticketContentShort);
      ticketContentShort.append(ticketCheckboxTitle, timeActionsTicket);
      ticketCheckboxTitle.append(ticketCheckbox, titleTicket);
      timeActionsTicket.append(ticketTime, ticketActions);
      ticketActions.append(btnEdit, btnRemove);
    }
  }
}
