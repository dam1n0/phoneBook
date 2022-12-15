import {useFieldArray, useForm, FormProvider} from "react-hook-form";
import {contactFields} from "../PhoneBookSlice";
import MultiFieldContainer from "./multiFIeldContainer";


type propsType = {
    contactId: number | null
    contactData: contactFields | null
    editOrAddContact: (contactId: number | null, data: any) => void
}

function ContactForm(props: propsType) {
    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: (props.contactId !== null) ? props.contactData?.name : '',
            lastName: (props.contactId !== null) ? props.contactData?.lastName : '',
            addressData: {
                address: (props.contactId !== null) ? props.contactData?.addressData.address : '',
                city: (props.contactId !== null) ? props.contactData?.addressData.city : '',
                country: (props.contactId !== null) ? props.contactData?.addressData.country : '',
            },
            multiFields: [
                {
                    fieldName: 'Email',
                    list: (props.contactId !== null) ?
                        props.contactData?.emails.map((emailItem) => ({name: emailItem})) : [{name: ''}],
                },
                {
                    fieldName: 'Phone',
                    list: (props.contactId !== null) ?
                        props.contactData?.phones.map((phoneItem) => ({name: phoneItem})) : [{name: ''}]
                }
            ]
        }
    });

    const {control} = methods;

    const {fields} = useFieldArray({
        control,
        name: 'multiFields'
    });

    const onSubmit = methods.handleSubmit((data) => {
        const [emails, phones] = data.multiFields.map((arr) => (arr.list?.map((item) => item.name)
            .filter((item) => (item !== ''))))
        let prepareData = {
            addressData: data.addressData,
            name: data.name,
            lastName: data.lastName,
            emails: emails,
            phones: phones
        }

        props.editOrAddContact(props.contactId, prepareData)
    });

    return (
        <div className='contactForm'>
            <h2>{(props.contactId !== null) ? 'Edit Contact' : 'Register new contact'}</h2>
            <form onSubmit={(onSubmit)}>
                <label>
                    Name:
                    <input key={'name'} {...methods.register('name', {required: 'Name is required'})}
                           type='text' placeholder='Enter the name'/>
                    {methods.formState.errors?.name && <p>{methods.formState.errors.name.message}</p>}
                </label>
                <label>
                    Last Name:
                    <input key={'lastName'} {...methods.register('lastName',
                        {required: 'Last Name is required'})}
                           type='text' placeholder='Enter Last Name'/>
                    {methods.formState.errors?.lastName && <p>{methods.formState.errors.lastName.message}</p>}
                </label>
                <label>
                    Address:
                    <input key={'address'} {...methods.register('addressData.address')} type='text'
                           placeholder='Enter address'/>
                </label>
                <label>
                    City:
                    <input key={'city'} {...methods.register('addressData.city')} type='text'
                           placeholder='Enter city'/>
                </label>
                <label>
                    Country:
                    <input key={'country'} {...methods.register('addressData.country')} type='text'
                           placeholder='Enter country'/>
                </label>

                <FormProvider {...methods}>
                    {fields.map((item, index) => (
                        <MultiFieldContainer multiFieldsIndex={index} fieldName={item.fieldName} key={item.id}/>
                    ))}
                </FormProvider>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default ContactForm