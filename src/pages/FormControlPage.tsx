import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { sendApiQuery } from '../api';
import { IJsonRpcFormResponse } from '../Interfaces';


const FormControlPage = () => {
    const { uid } = useParams<{ uid?: string }>()
    const [entry, setEntry] = useState(false)
    const [formData, setFormData] = useState<IJsonRpcFormResponse>({jsonrpc: ''})

    async function getForm(formUid: string | undefined){
        const response = await sendApiQuery("show_form", {"uid": formUid})
        return response
    }

    if (entry === false){
        setEntry(true)
        getForm(uid).then(data => setFormData(data))
    }

    return (
        <div className='container max-w-xl'>
            <div className='w-4/5 mx-auto p-1 items-center mt-5'>
                <label className='label'><h1>{formData.result?.title}</h1></label>
                <label className='label'><h2>{formData.result?.description}</h2></label>
            </div>
            <div className='container grid grid-cols-1 align-middle mt-32'>
                <a className='button-dark w-1/2 mx-auto my-5 py-2' href={'/'}>Create New Form</a>
                <a className='button-dark w-1/2 mx-auto my-5 py-2' href={`/form/${uid}`}>Answer To Created Form</a>
                <a className='button-dark w-1/2 mx-auto my-5 py-2' href={`/answers/${uid}`}>Answers Of Created Form</a>
            </div>
        </div>
    );
};

export default FormControlPage;
