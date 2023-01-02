import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper } from './ContactList.styled';
import {
  selectContacts,
  selectFilter,
  selectVisibleContacts,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';

export const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  const contacts = useSelector(selectContacts);
  const filterValue = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Wrapper>
        {visibleContacts.length > 0 ? (
          visibleContacts.map(contact => (
            <ContactListItem key={contact.id} {...contact} />
          ))
        ) : filterValue && contacts ? (
          <div>Unfortunately, we couldn't find any matches.</div>
        ) : (
          <div>You don't have any contacts yet.</div>
        )}
      </Wrapper>
    </>
  );
};