import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const argv = yargs(hideBin(process.argv)).argv;

import {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from './contacts.mjs';
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(contacts => console.table(contacts));
      break;

    case 'get':
      getContactById(id).then(contact => console.log(contact));
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
