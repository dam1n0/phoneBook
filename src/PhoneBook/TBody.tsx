import {contactFields} from "./PhoneBookSlice";
import React from "react";

type propsType = {
    contactList: contactFields[]
    openContactForm: (id: number) => void
    deleteHandler: (id: number) => void
}

function TBody(props: propsType) {
    return (
        <tbody>
        {props.contactList?.map((item, id) => (
            <tr key={id}>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>{item.addressData.address}</td>
                <td>{item.addressData.city}</td>
                <td>{item.addressData.country}</td>
                <td>{item.emails.map((col, index, array) => (
                    index === (array.length - 1)) ? col : `${col}, `)}</td>
                <td>{item.phones.map((col, index, array) => (
                    index === (array.length - 1)) ? col : `${col}, `)}</td>
                <td>
                    <button className='button editButton' onClick={() => props.openContactForm(id)}> Edit</button>
                </td>
                <td>
                    <button className='button deleteButton' onClick={() => props.deleteHandler(id)}> Delete</button>
                </td>
            </tr>
        ))}
        </tbody>
    )
}

export default TBody;
