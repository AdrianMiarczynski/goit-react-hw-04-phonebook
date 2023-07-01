import PropTypes from 'prop-types';
import css from './filter.module.css';
const FilterContacts = ({ filter, filterEvcontacts }) => {
  return (
    <label htmlFor="filter" className={css.filter}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        className={css['filter__input']}
        id="filter"
        value={filter}
        onChange={filterEvcontacts}
      />
    </label>
  );
};
export default FilterContacts;

FilterContacts.propTypes = {
  filter: PropTypes.string.isRequired,
  // handlerChange: PropTypes.func.isRequired,
};
