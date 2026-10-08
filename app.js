import { ContactoModel } from "./models/contacto.model.js";
import { ContactoView } from "./views/contacto.view.js";
import { ContactoController } from "./controllers/contacto.controller.js";

const view = new ContactoView();
const model = new ContactoModel(window.localStorage);
const controller = new ContactoController(model, view);

controller.init().catch((error) => view.notify(error.message, "error"));
