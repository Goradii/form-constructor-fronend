export interface ISelectField {
    items: {id: number, value: string}[]
}

export interface IInputField {
    placeholder?: string
}

interface IBaseField {
    id: number
    type: string
    title: string
    description: string
    placeholder?: string
    items?: {id: number, value: string}[]
}

export interface IBaseFieldConstructor extends IBaseField {
    id: number
}

export interface IBaseFieldVal{
    answers:IFieldAnswer[]
    setAnswers: Function
    val: IBaseField
}

export interface IJsonRpcRequest {
    jsonrpc: string
    id: string
    method: string
    params: object
}

export interface IJsonRpcForm {
    description: string
    title: string
    fields: IBaseField[]
}

export interface IJsonRpcFormResponse {
    jsonrpc: string
    id?: string
    result?: IJsonRpcForm
}

export interface IJsonRpcAnswersResponse{
    jsonrpc: string
    id?: string
    result?: {
        answers: IFieldAnswer[],
        uid: string
    }[]
}

export interface IJsonRpcAnswerResponse{
    jsonrpc: string
    id?: string
    result?: {
        answers: IFieldAnswer[],
        uid: string
    }
}

export interface IBaseFormConstructor{
    formTarget: string
    type: string
    form: IBaseFieldConstructor[]
    changeForm: Function
    id: number
    deleteField: Function
}

export interface IHeaderConstructor{
    header: {title: string, description: string}
    setHeader: Function
}

export interface IFieldAnswer{
    id: number
    value: string
}

export interface IAnswersHeader {
    fields?: IBaseField[]
}
