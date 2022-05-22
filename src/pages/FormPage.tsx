import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { sendApiQuery } from '../api';
import BaseField from '../components/BaseField';
import { IFieldAnswer, IJsonRpcFormResponse } from '../Interfaces';


const FormPage = () => {
    const [formData, setFormData] = useState<IJsonRpcFormResponse>({jsonrpc: ''})
    const [entry, setEntry] = useState(false)
    let [answers, setAnswers] = useState<IFieldAnswer[]>([])
    const navigate = useNavigate()

    const { uid } = useParams<{ uid?: string }>()

    async function getForm(formUid: string | undefined){
        const response = await sendApiQuery("show_form", {"uid": formUid})
        return response
    }

    async function sendForm(e: React.MouseEvent){
        e.preventDefault()
        const params = {"data":{"uid": uid, "answers": answers}}
        const response = await sendApiQuery("submit_form", params)
        navigate(`/answers/${uid}/${response.result}`)
    }

    if (entry === false){
        setEntry(true)
        getForm(uid).then(data => setFormData(data))
    }
    answers.length === 0 &&
    formData.result?.fields.map(
        val => answers = answers.concat({id: val.id, value: ''})
    )
    return (
        <div className='container max-w-3xl mt-5 mb-20'>
            <form>
                <div className='w-4/5 mx-auto p-1 items-center'>
                    <label className='label'><h1>{formData.result?.title}</h1></label>
                    <label className='label'><h2>{formData.result?.description}</h2></label>
                </div>
                {formData.result?.fields.map(val => <BaseField answers={answers} setAnswers={setAnswers} key={val.id} val={val}></BaseField>)}
                <div className='flex w-full justify-center mt-3'>
                    <button className='button-dark w-1/2' onClick={sendForm}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default FormPage;
