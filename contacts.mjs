import * as fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const contactsPath = path.normalize('./db/contacts.json');

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}
// listContacts().then(contacts => console.log(contacts));

export function getContactById(contactId) {
  return listContacts().then(contacts =>
    contacts.find(contact => contact.id === contactId),
  );
}
// getContactById(10).then(contact => console.log(contact));

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts().then(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
}
// removeContact(2);

export async function addContact(name, email, phone) {
  const uId = uuidv4();
  const newContact = { id: uId, name: name, email: email, phone: phone };
  try {
    const contacts = await listContacts().then(contacts =>
      contacts.map(contact => contact),
    );
    if (contacts.find(contact => contact.id === newContact.id)) {
      console.log('This contact is available');
      return;
    }
    if (contacts.find(contact => contact.name === newContact.name)) {
      console.log('This contact is available');
      return;
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
}
// addContact('John Bon Jovi', 'jovi@mail.com', '+234245754756734');
