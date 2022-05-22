import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendApiQuery } from "../api";
import BaseFieldConstructor from "../components/BaseFieldConstructor";
import FormHeaderConstructor from "../components/FormHeaderConstructor";
import { IBaseFieldConstructor, IJsonRpcFormResponse } from "../Interfaces";

const FormConstructorPage = () => {
    const formName = 'new_form'
    const inputDefault: IBaseFieldConstructor = {
        id: 0,
        type: 'Input',
        title: '',
        description: '',
        placeholder: ''
    }
    const selectDefault: IBaseFieldConstructor = {
        id: 0,
        type: 'Select',
        title: '',
        description: '',
        items: [{id: 0, value: ''}]
    }
    const textareaDefault: IBaseFieldConstructor = {
        id: 0,
        type: 'Textarea',
        title: '',
        description: '',
        placeholder: ''
    }
    const [header, setHeader] = useState({title: '', description: ''})
    const [fields, setFields] = useState([inputDefault])
    let [nextId, setNextId] = useState(1)
    const navigate = useNavigate()

    async function onSubmit(e: React.MouseEvent){
        e.preventDefault()
        const params = {
            "form_data":{
                "title": header.title,
                "description": header.description,
                "fields": fields
            }
        }
        const response: IJsonRpcFormResponse = await sendApiQuery("new_form", params)
        navigate(`/${response.result}`)
    }

    async function delField(id: number, e: React.MouseEvent){
        e.preventDefault()
        setFields(fields.filter(val => val.id !== id))
    }

    async function newSelectField(e: React.MouseEvent){
        e.preventDefault()
        setFields(fields.concat([{...selectDefault, id: nextId}]))
        setNextId(nextId + 1)
    }

    async function newInputField(e: React.MouseEvent){
        e.preventDefault()
        setFields(fields.concat([{...inputDefault, id: nextId}]))
        setNextId(nextId + 1)
    }

    async function newTextareaField(e: React.MouseEvent){
        e.preventDefault()
        setFields(fields.concat([{...textareaDefault, id: nextId}]))
        setNextId(nextId + 1)
    }
    return (
        <div className='container max-w-3xl'>
            <form id={formName} name={formName}>
                <FormHeaderConstructor header={header} setHeader={setHeader}></FormHeaderConstructor>
                {fields.map(val => ( <BaseFieldConstructor key={val.id} formTarget={formName} form={fields} changeForm={setFields} type={val.type} id={val.id} deleteField={delField}></BaseFieldConstructor> ))}
                <div className='flex justify-center'>
                    <button onClick={newSelectField} className='button-dark'>New Select</button>
                    <button onClick={newInputField} className='button-dark'>New Input</button>
                    <button onClick={newTextareaField} className='button-dark'>New Textarea</button>
                </div>
                <div className='flex w-full justify-center mt-3'>
                    <button className='button-dark w-1/2' onClick={onSubmit}>Create</button>
                </div>
            </form>
        </div>

    );
};

export default FormConstructorPage;