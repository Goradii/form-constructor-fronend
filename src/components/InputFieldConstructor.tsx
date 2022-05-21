import { useState } from "react";
import { IBaseFieldConstructor, IBaseFormConstructor } from "../Interfaces";

const InputFieldConstructor = ({formTarget, id, form, changeForm}:IBaseFormConstructor) => {
    let [me, setMe] = useState(form.filter(val => val.id === id)[0])

    function onFormChange(e: React.ChangeEvent<HTMLInputElement>, change: object){
        me = {...me, ...change}
        setMe({...me})
        let newForm: IBaseFieldConstructor[] = []
        for (let val of form){
            val.id === id
            ? newForm = newForm.concat(me)
            : newForm = newForm.concat(val)
        }
        changeForm(newForm)
    }
    return (
        <div>
            <br/>
            <label className='label'>
                Title
                <input value={me.title} onChange={e => {onFormChange(e, {title: e.target.value})}} formTarget={formTarget}  className='input'></input>
            </label>
            <label className='label'>
                Description
                <input value={me.description} onChange={e => {onFormChange(e, {description: e.target.value})}} formTarget={formTarget}  className='input'></input>
            </label>
            <label className='label'>
                Placeholder
                <input value={me.placeholder} onChange={e => {onFormChange(e, {placeholder: e.target.value})}} formTarget={formTarget}  className='input'></input>
            </label>
        </div>
    );
};

export default InputFieldConstructor;