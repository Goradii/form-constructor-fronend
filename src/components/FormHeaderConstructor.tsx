import { IHeaderConstructor } from "../Interfaces";

const FormHeaderConstructor = ({header, setHeader}:IHeaderConstructor) => {
    return (
        <div className='w-4/5 mx-auto p-1 items-center'>
            <label>
                <h1>New Form</h1>
                <input value={header.title} onChange={ e => setHeader({...header, title: e.target.value})} className='input max-w-none w-11/12 mx-auto'></input>
            </label>
            <label>
                <h1>Form Description</h1>
                <textarea value={header.description} onChange={ e => setHeader({...header, description: e.target.value})} className='textarea max-w-none w-11/12 mx-auto'></textarea>
            </label>
        </div>
    );
};

export default FormHeaderConstructor;