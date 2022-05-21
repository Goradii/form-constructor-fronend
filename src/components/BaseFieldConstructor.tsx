import { IBaseFormConstructor } from "../Interfaces";
import InputFieldConstructor from "./InputFieldConstructor";
import SelectFieldConstructor from "./SelectFieldConstructor";

const BaseFieldConstructor = ({formTarget, id, type, form, changeForm, deleteField}:IBaseFormConstructor) => {
    return (
        <div className='mx-auto w-4/5 border-2 p-1 rounded-md mb-3'>
            <label className='label'>{type}<button onClick={(e: React.MouseEvent) => deleteField(id, e)} className='button-dark-ol'> Del Field</button></label>
            { type === 'Select'
            ? <SelectFieldConstructor formTarget={formTarget} id={id} form={form} type={type} changeForm={changeForm} deleteField={deleteField}></SelectFieldConstructor>
            : ['Input', 'Textarea'].includes(type)
            ? <InputFieldConstructor formTarget={formTarget} id={id} form={form} type={type} changeForm={changeForm} deleteField={deleteField}></InputFieldConstructor>
            : <></>
            }
        </div>
    );
};

export default BaseFieldConstructor;