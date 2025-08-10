import HelpDesk from "../app/components/help-desk";
import TicketService from "../app/components/ticket-service";

const root = document.getElementById("root");

const ticketService = new TicketService();
const app = new HelpDesk(root, ticketService);

app.init();
