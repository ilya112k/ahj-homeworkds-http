import TicketView from "./ticket-view";
import TicketForm from "./ticket-form";

import Form from "../shared/form";
import Paragraph from "../shared/paragraph";
import Loader from "../shared/loader";

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    console.info("init");
    this.loader = new Loader({ class: "loader" }).element;
    this.body = document.querySelector("body");

    this.body.appendChild(this.loader);

    this.ticketForm = new TicketForm();
    this.ticketView = new TicketView(this.container);
    this.ticketService
      .list(this.ticketView.bindToDOMListTickets.bind(this.ticketView))
      .then(() => {
        const ticketsList = this.container.querySelector(".tickets-list");
        const btnAddTicket = this.container.querySelector(".add-ticket-btn");

        this.loader.remove();

        btnAddTicket.addEventListener("click", this.createTicket.bind(this));
        ticketsList.addEventListener("click", this.clickTicketsList.bind(this));
      });
  }

  async clickTicketsList(e) {
    this.removeTicket(e);
    this.updateCheckbox(e);
    this.updateTicket(e);
    this.toggleMoreInfo(e);
  }

  toggleMoreInfo(e) {
    const btnEdit = e.target.closest(".btn-edit");
    const btnDel = e.target.closest(".btn-remove");
    const checkbox = e.target.closest(".checkbox-ticket");
    const label = e.target.closest(".checkbox-label");
    const ticketContainer = e.target.closest(".ticket-container");

    if (
      ticketContainer &&
      !btnEdit &&
      !btnDel &&
      !checkbox &&
      !label &&
      !ticketContainer.querySelector(".ticket-text")
    ) {
      this.body.appendChild(this.loader);
      this.ticketService.get(ticketContainer.id, (dataTicket) => {
        const ticketText = new Paragraph({
          class: "ticket-text",
          text: dataTicket.description,
        }).element;
        ticketContainer.appendChild(ticketText);
        this.loader.remove();
      });
    }

    ticketContainer.querySelector(".ticket-text") &&
      ticketContainer
        .querySelector(".ticket-text")
        .classList.toggle("ticket-text_hidden");
  }

  createTicket(e) {
    const ticketsContainer = e.target.closest(".tickets-container");
    const ticketsList = ticketsContainer.querySelector(".tickets-list");
    if (e.target.closest(".add-ticket-btn")) {
      const form = new Form({ class: ["form-create-ticket", "form"] }).element;
      this.container.appendChild(form);

      this.ticketForm.actionsTicketForm(form, { action: "create" });
      const btnCancel = form.querySelector(".ticket-close-btn");

      btnCancel.addEventListener("click", () => {
        form.remove();
      });
      form.addEventListener("submit", async (evn) => {
        evn.preventDefault();
        this.body.appendChild(this.loader);
        const data = new FormData(form);
        await this.ticketService.create(data, (dataTicket) => {
          form.reset();
          form.remove();

          this.ticketView.bindToDOMTicket(ticketsList, dataTicket);
          this.loader.remove();
        });
      });
    }
  }

  updateTicket(e) {
    const ticketContainer = e.target.closest(".ticket-container");
    if (e.target.closest(".btn-edit")) {
      const form = new Form({ class: ["form-edit-ticket", "form"] }).element;

      this.body.appendChild(this.loader);
      this.ticketService.get(ticketContainer.id, (data) => {
        this.container.appendChild(form);

        this.ticketForm.actionsTicketForm(form, { data, action: "update" });
        const btnCancel = form.querySelector(".ticket-close-btn");
        this.loader.remove();

        btnCancel.addEventListener("click", () => {
          form.remove();
        });

        form.addEventListener("submit", (evn) => {
          this.container.appendChild(form);
          evn.preventDefault();

          const data = new FormData(form);
          this.body.appendChild(this.loader);
          this.ticketService.update(ticketContainer.id, data, () => {
            form.reset();
            form.remove();

            this.loader.remove();
            this.body.appendChild(this.loader);
            this.ticketService.get(ticketContainer.id, (dataUpdateTicket) => {
              this.ticketView.bindToDOMUpdateTicket(
                this.container,
                dataUpdateTicket,
              );
              this.loader.remove();
            });
          });
        });
      });
    }
  }

  removeTicket(e) {
    const ticketContainer = e.target.closest(".ticket-container");
    if (e.target.closest(".btn-remove")) {
      const form = new Form({ class: ["form-del-ticket", "form"] }).element;

      this.container.appendChild(form);

      this.ticketForm.deleteTicketForm(form);

      const btnCancel = form.querySelector(".ticket-close-btn");

      btnCancel.addEventListener("click", () => {
        form.remove();
      });

      form.addEventListener("submit", (evn) => {
        evn.preventDefault();
        this.body.appendChild(this.loader);
        this.ticketService.delete(ticketContainer.id, () => {
          ticketContainer.remove();
          form.remove();
          this.loader.remove();
        });
      });
    }
  }

  updateCheckbox(e) {
    const ticketContainer = e.target.closest(".ticket-container");
    const checkbox = ticketContainer.querySelector(".checkbox-ticket");

    if (!e.target.closest(".checkbox-ticket")) {
      return;
    }
    let status = true;

    if (!checkbox.checked) {
      status = false;
    }

    this.body.appendChild(this.loader);
    this.ticketService.update(ticketContainer.id, { status }, () => {
      this.loader.remove();
    });
  }
}
