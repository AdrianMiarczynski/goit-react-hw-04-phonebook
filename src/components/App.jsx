import ContactsForm from './contactsform/contactsform';
import { nanoid } from 'nanoid';
import Contacts from './contactslist/contactslist';
import FilterContacts from './filter/filter';
import { useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // constructor() {
  //   super();
  //   const saveData = localStorage.getItem('contacts');
  //   const parseData = JSON.parse(saveData);
  //   this.state.contacts = parseData;
  // }

  const handlerChange = ev => {
    setName(ev.target.value);
  };
  const handlerChangeNumber = ev => {
    setNumber(ev.target.value);
  };

  const handlerSubmit = ev => {
    ev.preventDefault();
    const id = nanoid();
    if (filterContacts(name).length !== 0) {
      return alert(`${name} is already in contacts`);
    }
    addContacts({ name, number, id });
  };

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
  // componentDidUpdate() {
  //   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  // }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactsForm
        handlerChange={handlerChange}
        handlerChangeNumber={handlerChangeNumber}
        handlerSubmit={handlerSubmit}
        name={name}
        number={number}

        // name={this.state.name}
        // number={this.state.number}
      />
      <div>
        <h2>Contacts</h2>
        <FilterContacts
          filter={filter}
          filterEvcontacts={filterEvcontacts}
          // handlerChange={filterEvcontacts}
        />
        <Contacts
          contacts={filterContacts(filter)}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
};
export default App;
