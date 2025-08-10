export default class TicketService {
  static beUrl = "https://ahj-homeworks-http-help-desk-backend.vercel.app";
  async list(callback) {
    const response = await fetch(`${TicketService.beUrl}/?method=allTickets`);

    if (response.ok) {
      try {
        callback(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
  }

  async get(id, callback) {
    const response = await fetch(
      `${TicketService.beUrl}/?method=ticketById&id=${id}`,
    );

    if (response.ok) {
      try {
        callback(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
  }

  async create(data, callback) {
    const response = await fetch(
      `${TicketService.beUrl}/?method=createTicket`,
      {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(data)),
      },
    );

    if (response.ok) {
      try {
        callback(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
  }

  async update(id, data, callback) {
    let list = data;

    if (list instanceof FormData) {
      list = Object.fromEntries(list);
    }
    const response = await fetch(
      `${TicketService.beUrl}/?method=updateById&id=${id}`,
      {
        method: "POST",
        body: JSON.stringify(list),
      },
    );

    if (response.ok) {
      try {
        callback(await response.json());
      } catch (e) {
        console.error(e);
      }
    }
  }

  async delete(id, callback) {
    const response = await fetch(
      `${TicketService.beUrl}/?method=deleteById&id=${id}`,
    );

    if (response.ok) {
      try {
        callback();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
