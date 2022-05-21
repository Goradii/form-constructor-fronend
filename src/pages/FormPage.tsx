import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import BaseField from '../components/BaseField';
import { API_URL } from '../config';
import { IFieldAnswer, IJsonRpcFormResponse } from '../Interfaces';


const FormPage = () => {
    const [formData, setFormData] = useState<IJsonRpcFormResponse>({jsonrpc: ''})
    const [entry, setEntry] = useState(false)
    let [answers, setAnswers] = useState<IFieldAnswer[]>([])

    const { uid } = useParams<{ uid?: string }>()

    async function getForm(formUid: string | undefined){
        const response = await axios.post(API_URL, {"jsonrpc": "2.0", "id": 0, "method": "show_form", "params":{"uid": formUid}})
        return response.data
    }

    async function sendForm(e: React.MouseEvent){
        e.preventDefault()
        const body = {"jsonrpc": "2.0", "id": 0, "method": "submit_form", "params": {"data":{"uid": uid, "answers": answers}}}
        const response = await axios.post(API_URL, body)
        console.log(body)
        console.log(response.data)
        return response.data
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
        <div className='container max-w-3xl mt-5'>
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
