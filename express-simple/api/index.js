const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const foos = require('./contacts.cjs');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(contacts => console.table(contacts));
      break;

    case 'get':
      getContactById(id);
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

// invokeAction(argv);
