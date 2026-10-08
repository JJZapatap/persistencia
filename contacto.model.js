export class ContactoModel {
  constructor(storage = window.localStorage, storageKey = "agenda_mvc_contactos_v1") {
    this.storage = storage;
    this.storageKey = storageKey;
  }

  readAll() {
    try {
      const raw = this.storage.getItem(this.storageKey);
      if (!raw) return [];
      const contacts = JSON.parse(raw);
      if (!Array.isArray(contacts)) throw new Error();
      return contacts;
    } catch {
      throw new Error("Los datos guardados en el navegador no tienen un formato válido.");
    }
  }

  writeAll(contacts) {
    try {
      this.storage.setItem(this.storageKey, JSON.stringify(contacts));
    } catch {
      throw new Error("No fue posible guardar los datos. Revise el espacio disponible del navegador.");
    }
  }

  normalize(contact) {
    const clean = (value) => {
      const result = String(value ?? "").trim();
      return result || null;
    };

    return {
      nombres: String(contact.nombres ?? "").trim(),
      apellidos: String(contact.apellidos ?? "").trim(),
      documento: clean(contact.documento),
      email: clean(contact.email)?.toLowerCase() ?? null,
      telefono: clean(contact.telefono),
      ciudad: clean(contact.ciudad),
      direccion: clean(contact.direccion),
      fecha_nacimiento: clean(contact.fecha_nacimiento),
      notas: clean(contact.notas),
    };
  }

  validate(contact) {
    if (contact.nombres.length < 2 || contact.nombres.length > 80) {
      throw new Error("Los nombres deben contener entre 2 y 80 caracteres.");
    }
    if (contact.apellidos.length < 2 || contact.apellidos.length > 80) {
      throw new Error("Los apellidos deben contener entre 2 y 80 caracteres.");
    }
    if (contact.documento && (contact.documento.length < 3 || contact.documento.length > 30)) {
      throw new Error("El documento debe contener entre 3 y 30 caracteres.");
    }
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      throw new Error("El correo electrónico no tiene un formato válido.");
    }
    if (contact.telefono && (contact.telefono.length < 7 || contact.telefono.length > 30)) {
      throw new Error("El teléfono debe contener entre 7 y 30 caracteres.");
    }
    if (contact.fecha_nacimiento && contact.fecha_nacimiento > this.today()) {
      throw new Error("La fecha de nacimiento no puede ser futura.");
    }
    if (contact.notas && contact.notas.length > 500) {
      throw new Error("Las notas no pueden superar 500 caracteres.");
    }
  }

  validateUnique(contacts, contact, excludedId = null) {
    const duplicate = contacts.find((item) => {
      if (item.id === excludedId) return false;
      const sameDocument = contact.documento && item.documento === contact.documento;
      const sameEmail = contact.email && String(item.email ?? "").toLowerCase() === contact.email;
      return sameDocument || sameEmail;
    });

    if (duplicate) {
      throw new Error("Ya existe un contacto con ese documento o correo electrónico.");
    }
  }

  async list(searchTerm = "") {
    const term = searchTerm.trim().toLocaleLowerCase("es");
    return this.readAll()
      .filter((contact) => {
        if (!term) return true;
        return [contact.nombres, contact.apellidos, contact.documento, contact.email, contact.telefono, contact.ciudad]
          .some((value) => String(value ?? "").toLocaleLowerCase("es").includes(term));
      })
      .sort((a, b) => {
        const lastName = a.apellidos.localeCompare(b.apellidos, "es", { sensitivity: "base" });
        return lastName || a.nombres.localeCompare(b.nombres, "es", { sensitivity: "base" });
      });
  }

  async create(contact) {
    const contacts = this.readAll();
    const normalized = this.normalize(contact);
    this.validate(normalized);
    this.validateUnique(contacts, normalized);

    const now = new Date().toISOString();
    const created = {
      id: this.createId(),
      ...normalized,
      created_at: now,
      updated_at: now,
    };
    contacts.push(created);
    this.writeAll(contacts);
    return created;
  }

  async update(id, contact) {
    const contacts = this.readAll();
    const index = contacts.findIndex((item) => item.id === id);
    if (index < 0) throw new Error("El contacto que intenta actualizar ya no existe.");

    const normalized = this.normalize(contact);
    this.validate(normalized);
    this.validateUnique(contacts, normalized, id);

    contacts[index] = {
      ...contacts[index],
      ...normalized,
      updated_at: new Date().toISOString(),
    };
    this.writeAll(contacts);
    return contacts[index];
  }

  async remove(id) {
    const contacts = this.readAll();
    const remaining = contacts.filter((item) => item.id !== id);
    if (remaining.length === contacts.length) {
      throw new Error("El contacto que intenta eliminar ya no existe.");
    }
    this.writeAll(remaining);
  }

  createId() {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    return `contacto-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  today() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }
}
