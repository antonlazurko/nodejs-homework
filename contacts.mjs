import * as fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const contactsPath = path.normalize('./db/contacts.json');

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const contact = await listContacts().then(contacts =>
      contacts.find(contact => contact.id === contactId),
    );
    if (contact) {
      return console.table(contact);
    }
    return console.log(`There is no contact with ${contactId} id`);
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts().then(contacts =>
      contacts.map(contact => contact),
    );
    const filterdContacts = await listContacts().then(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
    if (contacts.length === filterdContacts.length) {
      return console.log(`There is no contact with "${contactId}" id`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(filterdContacts));
    console.log(`Contact with id "${contactId}" successfully delete`);
    return console.table(await listContacts());
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  const uId = uuidv4();
  const newContact = { id: uId, name: name, email: email, phone: phone };
  try {
    const contacts = await listContacts().then(contacts =>
      contacts.map(contact => contact),
    );
    if (contacts.find(contact => contact.name === newContact.name)) {
      console.log('This contact is available');
      return;
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log('This contact is successfully added');
    return console.table(await listContacts());
  } catch (error) {
    console.log(error);
  }
}
