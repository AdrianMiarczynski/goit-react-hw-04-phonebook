import PropTypes from 'prop-types';
import css from './contactsform.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';

const ContactsForm = ({ filterContacts, addContacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

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
  return (
    <form onSubmit={handlerSubmit} className={css.form}>
      <label htmlFor="name" className={css['form__label']}>
        Name
        <input
          onChange={handlerChange}
          value={name}
          type="text"
          className={css['form__input']}
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor="number" className={css['form__label']}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id="number"
          value={number}
          className={css['form__input']}
          onChange={handlerChangeNumber}
        />
      </label>
      <button type="submit" className={css['form__btn']}>
        Add contact
      </button>
    </form>
  );
};
export default ContactsForm;

ContactsForm.propTypes = {
  addContacts: PropTypes.func.isRequired,
  filterContacts: PropTypes.func.isRequired,
};
