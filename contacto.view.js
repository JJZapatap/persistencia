export class ContactoView {
  constructor() {
    this.contactForm = document.querySelector("#contact-form");
    this.contactId = document.querySelector("#contact-id");
    this.formTitle = document.querySelector("#form-title");
    this.saveButton = document.querySelector("#save-button");
    this.cancelEditButton = document.querySelector("#cancel-edit-button");
    this.clearButton = document.querySelector("#clear-button");
    this.searchInput = document.querySelector("#search-input");
    this.contactList = document.querySelector("#contact-list");
    this.contactCount = document.querySelector("#contact-count");
    this.emptyState = document.querySelector("#empty-state");
    this.toast = document.querySelector("#toast");

    this.fields = {
      nombres: document.querySelector("#nombres"),
      apellidos: document.querySelector("#apellidos"),
      documento: document.querySelector("#documento"),
      email: document.querySelector("#email"),
      telefono: document.querySelector("#telefono"),
      ciudad: document.querySelector("#ciudad"),
      direccion: document.querySelector("#direccion"),
      fecha_nacimiento: document.querySelector("#fecha-nacimiento"),
      notas: document.querySelector("#notas"),
    };
  }

  getContactData() {
    const clean = (value) => value.trim() || null;
    return {
      nombres: this.fields.nombres.value.trim(),
      apellidos: this.fields.apellidos.value.trim(),
      documento: clean(this.fields.documento.value),
      email: clean(this.fields.email.value),
      telefono: clean(this.fields.telefono.value),
      ciudad: clean(this.fields.ciudad.value),
      direccion: clean(this.fields.direccion.value),
      fecha_nacimiento: this.fields.fecha_nacimiento.value || null,
      notas: clean(this.fields.notas.value),
    };
  }

  getEditingId() {
    return this.contactId.value || null;
  }

  startEdit(contact) {
    this.contactId.value = contact.id;
    Object.entries(this.fields).forEach(([key, input]) => {
      input.value = contact[key] ?? "";
    });
    this.formTitle.textContent = "Actualizar contacto";
    this.saveButton.textContent = "Guardar cambios";
    this.cancelEditButton.classList.remove("hidden");
    this.contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  resetForm() {
    this.contactForm.reset();
    this.contactId.value = "";
    this.formTitle.textContent = "Nuevo contacto";
    this.saveButton.textContent = "Guardar contacto";
    this.cancelEditButton.classList.add("hidden");
  }

  setBusy(isBusy) {
    this.saveButton.disabled = isBusy;
  }

  renderContacts(contacts, handlers) {
    this.contactList.replaceChildren();
    this.emptyState.classList.toggle("hidden", contacts.length > 0);
    this.contactCount.textContent = `${contacts.length} ${contacts.length === 1 ? "contacto" : "contactos"}`;

    for (const contact of contacts) {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      const name = document.createElement("span");
      name.className = "contact-name";
      name.textContent = `${contact.nombres} ${contact.apellidos}`;
      const documentText = document.createElement("span");
      documentText.className = "contact-detail";
      documentText.textContent = contact.documento ? `Documento: ${contact.documento}` : "Sin documento";
      nameCell.append(name, documentText);

      const contactCell = document.createElement("td");
      const email = document.createElement("span");
      email.textContent = contact.email || "Sin correo";
      const phone = document.createElement("span");
      phone.className = "contact-detail";
      phone.textContent = contact.telefono || "Sin teléfono";
      contactCell.append(email, phone);

      const cityCell = document.createElement("td");
      cityCell.textContent = contact.ciudad || "-";

      const actionCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "actions";
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "button button--small button--edit";
      editButton.textContent = "Editar";
      editButton.addEventListener("click", () => handlers.onEdit(contact));
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "button button--small button--delete";
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", () => handlers.onDelete(contact));
      actions.append(editButton, deleteButton);
      actionCell.append(actions);

      row.append(nameCell, contactCell, cityCell, actionCell);
      this.contactList.append(row);
    }
  }

  notify(message, type = "success") {
    this.toast.textContent = message;
    this.toast.className = `toast toast--${type}`;
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => this.toast.classList.add("hidden"), 4200);
  }
}
