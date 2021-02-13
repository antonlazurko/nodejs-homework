const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
} = require('../api/contacts.cjs');
let contactsArray = [];
listContacts().then(contacts => (contactsArray = contacts));

/* GET home page. */
router.get('/api/contacts', function (req, res, next) {
  res.render('contacts', {
    title: 'Contacts',
    contacts: contactsArray,
  });
});

/* GET contact. */
let contactObj = {};
getContactById(5).then(contact => (contactObj = contact));
router.get('/api/contacts/:contactId', function (req, res, next) {
  res.render('contact', { title: 'Contact', contact: contactObj });
});

/* POST contact. */
router.post('/api/contacts', async function (req, res, next) {
  try {
    await addContact('name', 'email', 'phone');
    res.redirect('/api/contacts');
  } catch (e) {
    next(e);
  }
});

// /* DELETE contact. */
// router.get('/api/contacts/:contactId', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// /* PATCH contacts. */
// router.get('/api/contacts/:contactId', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
