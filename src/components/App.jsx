import ContactsForm from './contactsform/contactsform';
import Contacts from './contactslist/contactslist';
import FilterContacts from './filter/filter';
import { useEffect, useState } from 'react';

export const App = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const saveData = localStorage.getItem('contacts');
    const parseData = JSON.parse(saveData);
    setContacts(parseData);
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('contacts', JSON.stringify(contacts));
  },);

  const addContacts = async data => {
    await setContacts(prevContacts => [...prevContacts, data]);
  };

  const filterContacts = name => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };
  const filterEvcontacts = ev => {
    setFilter(ev.target.value);
    filterContacts(ev.target.value);
  };

  const deleteContact = async id => {
    await setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactsForm addContacts={addContacts} filterContacts={filterContacts} />
      <div>
        <h2>Contacts</h2>
        <FilterContacts filter={filter} filterEvcontacts={filterEvcontacts} />
        <Contacts
          contacts={filterContacts(filter)}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
};
export default App;
