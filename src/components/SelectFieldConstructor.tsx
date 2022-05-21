import { useState } from "react";
import { IBaseFieldConstructor, IBaseFormConstructor } from "../Interfaces";


const SelectFieldConstructor = ({formTarget, id, form, changeForm}: IBaseFormConstructor) => {
    let [nextId, setNextId] = useState(1)
    const [me, setMe] = useState(form.filter(val => val.id === id)[0])
    


    async function newItem(e: React.MouseEvent){
        e.preventDefault()
        me.items = me.items?.concat([{id: nextId, value: ''}])
        setNextId(nextId + 1)
    }

    async function delItem(e: React.MouseEvent){
        e.preventDefault()
        me.items?.pop()
        setMe({...me})
    }


    function onFormChange(e: React.ChangeEvent<HTMLInputElement>, change: object | string, iId?: number){
        if (iId !== undefined && me.items !== undefined && typeof(change) === 'string'){
            for (let val of me.items){val.id === iId && (val.value = change)}
        }
        if (typeof(change) === 'object'){setMe({...me, ...change})}
        let newForm: IBaseFieldConstructor[] = []
        for (let val of form){
            val.id === id
            ? newForm = newForm.concat(me)
            : newForm = newForm.concat(val)
        }
        changeForm(newForm)
    }
    me.items === undefined && (me.items = [{id: 0, value: ''}])
    return (
        <div> 
            <br/>
            <label className='label'>
                Title
                <input formTarget={formTarget} value={me.title} onChange={e => {onFormChange(e, {title: e.target.value})}} className='input'></input>
            </label>

            <label className='label'>
                Description
                <input formTarget={formTarget} value={me.description} onChange={e => {onFormChange(e, {description: e.target.value})}} className='input'></input>
            </label>

            <label className='label'>
                Choices
                <div className='input'>
                    {me.items.map(
                        val => <input key={val.id} value={val.value} onChange={e => {onFormChange(e, e.target.value, val.id)}} className='c-input'></input>
                    )}
                </div>
            </label>
            <div className='flex'>
                <button onClick={newItem} className='button-dark-ol'>New Item</button>
                <button onClick={delItem} className='button-dark-ol'> Del Item</button>
            </div>
        </div>
    );
};

export default SelectFieldConstructor;