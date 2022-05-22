import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { sendApiQuery } from '../api';
import { IJsonRpcAnswerResponse, IJsonRpcFormResponse } from '../Interfaces';


const AnswersPage = () => {
    const [formAnswerData, setFormAnswerData] = useState<IJsonRpcAnswerResponse>({jsonrpc: ''})
    const [formData, setFormData] = useState<IJsonRpcFormResponse>({jsonrpc: ''})
    const [entry, setEntry] = useState(false)

    const { formUid, answerUid } = useParams<{ formUid?: string, answerUid?: string }>()

    async function getAnswer(answerUid: string | undefined, id?: number){
        const response = await sendApiQuery("show_answer", {"uid": answerUid}, id) 
        return response
    }

    async function getForm(formUid: string | undefined, id?: number){
        const response = await sendApiQuery("show_form", {"uid": formUid}, id) 
        return response
    }

    if (entry === false){
        setEntry(true)
        getAnswer(answerUid).then(data => setFormAnswerData(data))
        getForm(formUid).then(data => setFormData(data))
    }
    return (
        <div className='container max-w-5xl mt-5'>
            <div className='w-4/5 mx-auto p-1 items-center'>
                <label className='label'><h1>{formData.result?.title}</h1></label>
                <label className='label'><h2>{formData.result?.description}</h2></label>
            </div>
            <div className='w-4/5 mx-auto p-1 items-center'>
                {formData.result?.fields.map(field => (
                    <div key={field.id} className='mx-auto border-2 p-1 rounded-md mb-3'>
                        <label><h2>{field.title}</h2></label>
                        {formAnswerData.result?.answers.map(answer => (
                            answer.id === field.id && <label key={answer.id}><h3 className='ml-5'>{answer.value}</h3></label>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnswersPage;
