import ContactsForm from './contactsform/contactsform';
import Contacts from './contactslist/contactslist';
import FilterContacts from './filter/filter';
import { useEffect, useState } from 'react';

const initState = [
  { id: 'id-1', name: 'Jose Arcadio Morales', number: '+34 459-123-563' },
  { id: 'id-2', name: 'Jan Nowakowski', number: '+48 443-859-125' },
  { id: 'id-3', name: 'Bruno Bierhals', number: '+49 645-122-792' },
  { id: 'id-4', name: 'Rolf Ruckzug', number: '+43 227-252-929' },
];

export const App = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setIsMounted(true);
    const saveData = localStorage.getItem('contacts');
    const parseData = JSON.parse(saveData) || [...initState];
    setContacts(parseData);
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, isMounted]);

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
