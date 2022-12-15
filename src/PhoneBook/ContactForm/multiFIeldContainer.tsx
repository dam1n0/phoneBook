import React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';

type propsType = {
    multiFieldsIndex: number
    fieldName: string
}

const MultiFieldContainer = (props: propsType) => {
    const {register, control} = useFormContext();
    const {fields, append} = useFieldArray({
        control,
        name: `multiFields.${props.multiFieldsIndex}.list`
    });

    const addProfileHandler = () => {
        append({
            name: '',
            control
        });
    };

    return (
        <div className='multiFields'>
            <label>
                {`${props.fieldName}:`}
                {fields.map((field, index) => {
                    return (
                        <input key={field.id}
                               {...register((`multiFields.${props.multiFieldsIndex}.list.${index}.name` as const),
                                   {
                                       pattern: {
                                           value: (props.fieldName === 'Email') ?
                                               /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ :
                                               /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){5,14}(\s*)?$/,
                                           message: `Invalid ${props.fieldName}`
                                       }
                                   }
                               )}
                               type={(props.fieldName === 'Email') ? "email" : "tel"}
                               placeholder={(props.fieldName === 'Email') ? "Enter Email" : "Enter Phone"}/>
                    )
                })}

                <div className='addBottom'>
                    <button className='rightBottom' type="button"
                            onClick={addProfileHandler}>Add
                    </button>
                </div>
            </label>
        </div>
    );
};

export default MultiFieldContainer