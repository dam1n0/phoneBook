import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

type address = {
    address: string
    city: string
    country: string
}

export type contactFields = {
    name: string
    lastName: string
    addressData: address
    emails: string[]
    phones: string[]
}


export const columnsName = ["Name", "Last Name", "Address", "City", "Country", "Email", "Number", "Edit", "Delete"];

const initialState: contactFields[] = [
    {
        name: 'Elon',
        lastName: 'Musk',
        addressData: {
            address: 'Lakeway 38',
            city: 'San Francisco',
            country: 'USA'
        },
        emails: ['elon-musk@gmail.com'],
        phones: ['18885183752', '18885183753']
    },
    {
        name: 'Jeff',
        lastName: 'Bezos',
        addressData: {
            address: 'Lakeway 39',
            city: 'New Mexico',
            country: 'USA'
        },
        emails: ['bezos@gmail.com', 'bezdos@gmail.com'],
        phones: ['18885180052']
    },
    {
        name: 'Bernard',
        lastName: 'Arnault',
        addressData: {
            address: 'Lakeway 10',
            city: 'Roubaix',
            country: 'France'
        },
        emails: ['Arnault@gmail.com'],
        phones: ['18885333752']
    },
    {
        name: 'Bill',
        lastName: 'Gates',
        addressData: {
            address: 'Lakeway 15',
            city: 'Washington',
            country: 'USA'
        },
        emails: ['bill.gates@gatesfoundation.org'],
        phones: ['18885333352']
    },
    {
        name: 'Warren',
        lastName: 'Buffett',
        addressData: {
            address: '3555 Farnam St',
            city: 'Omaha',
            country: 'USA'
        },
        emails: ['berkshire@berkshirehathaway.com'],
        phones: ['18885183752']
    },

];

export const PhoneBookSlice = createSlice({
    name: 'phonebook',
    initialState,

    reducers: {
        changeOrAddContact: (state, action: PayloadAction<{ id: number | null, data: contactFields }>) => {
            if (action.payload.id !== null) {
                state[+action.payload.id] = action.payload.data
            }
            state.push(action.payload.data)
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            state.splice(+action.payload, 1);
        }
    }
});

export const {changeOrAddContact, deleteContact} = PhoneBookSlice.actions;

export const selectPhoneBook = (state: RootState) => state.phonebook;




