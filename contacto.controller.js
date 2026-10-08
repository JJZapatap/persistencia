export class ContactoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.contacts = [];
    this.searchTimer = null;
  }

  async init() {
    this.bindEvents();
    await this.loadContacts();
  }

  bindEvents() {
    this.view.contactForm.addEventListener("submit", (event) => this.handleSave(event));
    this.view.clearButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.view.resetForm();
    });
    this.view.cancelEditButton.addEventListener("click", () => this.view.resetForm());
    this.view.searchInput.addEventListener("input", () => {
      window.clearTimeout(this.searchTimer);
      this.searchTimer = window.setTimeout(() => this.loadContacts(this.view.searchInput.value), 300);
    });
  }

  async loadContacts(searchTerm = "") {
    try {
      this.contacts = await this.model.list(searchTerm);
      this.view.renderContacts(this.contacts, {
        onEdit: (contact) => this.view.startEdit(contact),
        onDelete: (contact) => this.handleDelete(contact),
      });
    } catch (error) {
      this.view.notify(this.friendlyError(error), "error");
    }
  }

  async handleSave(event) {
    event.preventDefault();
    if (!this.view.contactForm.reportValidity()) return;

    const id = this.view.getEditingId();
    const contact = this.view.getContactData();
    try {
      this.view.setBusy(true);
      if (id) {
        await this.model.update(id, contact);
        this.view.notify("Contacto actualizado.");
      } else {
        await this.model.create(contact);
        this.view.notify("Contacto registrado.");
      }
      this.view.resetForm();
      await this.loadContacts(this.view.searchInput.value);
    } catch (error) {
      this.view.notify(this.friendlyError(error), "error");
    } finally {
      this.view.setBusy(false);
    }
  }

  async handleDelete(contact) {
    const confirmed = window.confirm(`¿Eliminar a ${contact.nombres} ${contact.apellidos}?`);
    if (!confirmed) return;
    try {
      await this.model.remove(contact.id);
      this.view.notify("Contacto eliminado.");
      await this.loadContacts(this.view.searchInput.value);
    } catch (error) {
      this.view.notify(this.friendlyError(error), "error");
    }
  }

  friendlyError(error) {
    return error?.message ?? "Ocurrió un error inesperado.";
  }
}
