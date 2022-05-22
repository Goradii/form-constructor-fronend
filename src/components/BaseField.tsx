import { useState } from 'react';
import { IBaseFieldVal, IFieldAnswer } from '../Interfaces';


const BaseField = ({val, answers, setAnswers}:IBaseFieldVal) => {
    let [me, setMe] = useState(answers.filter(item => item.id === val.id)[0])

    function onFormChange(e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
        let newAnswers: IFieldAnswer[] = []
        me = {...me, value: e.target.value}
        setMe({...me})
        for (let item of answers){
            item.id === val.id
            ? newAnswers = newAnswers.concat(me)
            : newAnswers = newAnswers.concat(item)
        }
        setAnswers(newAnswers)
    }
    return (
        <div className='mx-auto w-4/5 border-2 p-1 rounded-md mb-3'>
            <label key={1} className='label'><h2>{val.title}</h2></label>
            <label key={2} className='label pl-3'><h3>{val.description}</h3></label>
            {val.type === 'Input'
            ?<input value={me.value} onChange={e => onFormChange(e)} className='input w-11/12 max-w-none' placeholder={val.placeholder}></input>
            :val.type === 'Textarea'
            ?<textarea value={me.value} onChange={e => onFormChange(e)} className='textarea w-11/12 max-w-none' placeholder={val.placeholder}></textarea>
            :val.type === 'Select'
            && val.items !== undefined
            && (<select value={me.value} onChange={e => onFormChange(e)} className='input w-11/12 max-w-none'>
                {val.items.map((item) => (<option key={item.id} value={item.value}>{item.value}</option>))}
            </select>)
            }
        </div>
    );
};

export default BaseField;