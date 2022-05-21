import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import AnswerRow from '../components/AnswerRow';
import AnswersHeader from '../components/AnswersHeader';
import { API_URL } from '../config';
import { IJsonRpcAnswersResponse, IJsonRpcFormResponse } from '../Interfaces';


const AnswersPage = () => {
    const [formAnswersData, setFormAnswersData] = useState<IJsonRpcAnswersResponse>({jsonrpc: ''})
    const [formData, setFormData] = useState<IJsonRpcFormResponse>({jsonrpc: ''})
    const [entry, setEntry] = useState(false)

    const { formUid } = useParams<{ formUid?: string }>()

    async function getAnswers(formUid: string | undefined){
        const response = await axios.post(API_URL, {"jsonrpc": "2.0", "id": 0, "method": "show_answers_by_form", "params":{"form_uid": formUid}})
        return response.data
    }

    async function getForm(formUid: string | undefined){
        const response = await axios.post(API_URL, {"jsonrpc": "2.0", "id": 1, "method": "show_form", "params":{"uid": formUid}})
        return response.data
    }

    if (entry === false){
        setEntry(true)
        getAnswers(formUid).then(data => setFormAnswersData(data))
        getForm(formUid).then(data => setFormData(data))
    }
    console.log(formAnswersData)
    return (
        <div className='container max-w-7xl mt-5'>
            <div className='w-4/5 mx-auto p-1 items-center'>
                <label className='label'><h1>{formData.result?.title}</h1></label>
                <label className='label'><h2>{formData.result?.description}</h2></label>
            </div>
            <table className='w-4/5 mx-auto p-1 border-collapse table-auto mt-10'>
                <thead>
                    <AnswersHeader fields={formData.result?.fields}></AnswersHeader>
                </thead>
                <tbody>
                    {formAnswersData.result?.map(val => <AnswerRow uid={`${formUid}/${val.uid}`} key={val.uid} fields={val.answers}></AnswerRow>)}
                </tbody>
            </table>
        </div>
    );
};

export default AnswersPage;
