import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { API_URL } from '../config';
import { IJsonRpcAnswerResponse, IJsonRpcFormResponse } from '../Interfaces';


const AnswersPage = () => {
    const [formAnswerData, setFormAnswerData] = useState<IJsonRpcAnswerResponse>({jsonrpc: ''})
    const [formData, setFormData] = useState<IJsonRpcFormResponse>({jsonrpc: ''})
    const [entry, setEntry] = useState(false)

    const { formUid, answerUid } = useParams<{ formUid?: string, answerUid?: string }>()
    async function getAnswer(answerUid: string | undefined){
        const response = await axios.post(API_URL, {"jsonrpc": "2.0", "id": 0, "method": "show_answer", "params":{"uid": answerUid}})
        return response.data
    }

    async function getForm(formUid: string | undefined){
        const response = await axios.post(API_URL, {"jsonrpc": "2.0", "id": 1, "method": "show_form", "params":{"uid": formUid}})
        return response.data
    }
    if (entry === false){
        setEntry(true)
        getAnswer(answerUid).then(data => setFormAnswerData(data))
        getForm(formUid).then(data => setFormData(data))
    }
    console.log(formAnswerData)
    console.log(formData)
    return (
        <div className='container max-w-5xl mt-5'>
            <div className='w-4/5 mx-auto p-1 items-center'>
                <label className='label'><h1>{formData.result?.title}</h1></label>
                <label className='label'><h2>{formData.result?.description}</h2></label>
            </div>
            <div className='w-4/5 mx-auto p-1 items-center'>
                {formData.result?.fields.map(field => (
                    <div key={field.id} className='mx-auto w-4/5 border-2 p-1 rounded-md mb-3'>
                        <label><h2>{field.title}</h2></label>
                        {formAnswerData.result?.answers.map(answer => (
                            answer.id === field.id && <label key={answer.id}><h3>{answer.value}</h3></label>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnswersPage;
