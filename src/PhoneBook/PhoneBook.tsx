import React, {useState} from "react";
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {changeOrAddContact, columnsName, contactFields, deleteContact, selectPhoneBook} from "./PhoneBookSlice";
import ContactForm from "./ContactForm/ContactForm";
import THead from "./THead";
import TBody from "./TBody";


export function PhoneBook() {
    const dispatch = useAppDispatch();
    const contactList = useAppSelector(selectPhoneBook);
    const [isOpenContactForm, setContactForm] = useState<boolean>(false);
    const [contactId, setContactId] = useState<null | number>(null);

    const openContactForm = (id: number | null) => {
        setContactId(id);
        setContactForm(true)
    }
    const editOrAddContact = (id: number | null, data: contactFields) => {
        dispatch(changeOrAddContact({id, data}));
        setContactForm(false)
    }

    const deleteHandler = (id: number) => {
        dispatch(deleteContact(id));
    }

    if (isOpenContactForm) {
        return (
            <ContactForm contactId={contactId} contactData={(contactId !== null) ? contactList[contactId] : null}
                         editOrAddContact={editOrAddContact}/>)
    }
    return (
        <div className='PhoneBook'>
            <div className='topTable'>
                <div><h2>Contacts</h2></div>
                <div>
                    <button className='button' onClick={() => openContactForm(null)}>Add Contact</button>
                </div>
            </div>
            <div>
                <table className='phoneTable'>
                    <THead columns={columnsName}/>
                    <TBody contactList={contactList} openContactForm={openContactForm} deleteHandler={deleteHandler}/>
                </table>
            </div>
        </div>
    )
}