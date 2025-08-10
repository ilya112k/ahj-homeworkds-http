import Button from "../shared/button";
import Div from "../shared/div";
import Heading from "../shared/heading";
import InputText from "../shared/input-text";
import Label from "../shared/label";
import Paragraph from "../shared/paragraph";
import Textarea from "../shared/textarea";

export default class TicketForm {
  deleteTicketForm(parentEl) {
    const titleDeleteForm = new Heading({
      class: "title-ticket-form",
      text: "Удалить тикет",
      level: "3",
    }).element;
    const delTicketText = new Paragraph({
      class: "del-ticket-text",
      text: `Вы уверены, что хотите удалить тикет? Это
    действие необратимо.`,
    }).element;
    const delTicketActions = new Div({ class: "del-ticket-actions" }).element;
    const delBtnClose = new Button({
      class: "ticket-close-btn",
      text: "Отмена",
      type: "button",
    }).element;
    const delBtn = new Button({
      class: "ticket-del-btn",
      text: "Ok",
      type: "submit",
    }).element;

    parentEl.append(titleDeleteForm, delTicketText, delTicketActions);
    delTicketActions.append(delBtnClose, delBtn);
  }

  actionsTicketForm(parentEl, info) {
    let title;
    let dataCurrent;

    if (info.action === "update") {
      title = "Изменить тикет";
      dataCurrent = info.data;
    } else if (info.action === "create") {
      title = "Добавить тикет";
      dataCurrent = { name: "", description: "" };
    }

    const TicketFormTitle = new Heading({
      class: "title-ticket-form",
      text: title,
      level: "3",
    }).element;

    const shortDescription = new Div({ class: "short-description" }).element;
    const labelShortDescription = new Label({
      class: "label-short-description",
      text: "Краткое описание",
      for: "input-short-description",
    }).element;
    const inputDescriptionShort = new InputText({
      name: "name",
      id: "input-short-description",
      type: "text",
      class: "input-short-description",
      value: dataCurrent.name,
    }).element;

    const description = new Div({ class: "description" }).element;
    const labelDescription = new Label({
      class: "label-short-description",
      text: "Подробное описание",
      for: "input-short-description",
    }).element;
    const textareaDescription = new Textarea({
      class: "textarea-description",
      name: "description",
      id: "textarea-description",
      text: dataCurrent.description,
    }).element;

    const actionsDescription = new Div({ class: "actions-description" })
      .element;
    const btnCancel = new Button({
      class: "ticket-close-btn",
      text: "Отмена",
      type: "button",
    }).element;
    const btnOk = new Button({
      class: "ticket-ok-btn",
      text: "Ok",
      type: "submit",
    }).element;

    parentEl.append(
      TicketFormTitle,
      shortDescription,
      description,
      actionsDescription,
    );
    shortDescription.append(labelShortDescription, inputDescriptionShort);
    description.append(labelDescription, textareaDescription);
    actionsDescription.append(btnCancel, btnOk);
  }
}
