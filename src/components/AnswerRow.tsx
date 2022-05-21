import { IFieldAnswer } from '../Interfaces';

interface IAnswerRow {
    fields: IFieldAnswer[]
    uid: string
}

const AnswerRow = ({fields, uid}:IAnswerRow) => {
    fields = fields?.slice(0,5)

    return (
        <tr>
            {fields?.map(val => <td className='p-4 pl-8 border-b-2' key={val.id}>{val.value}</td>)}
            <td className='p-4 pl-8 border-b-2 text-right'><a href={uid} className='button-dark'>Open</a></td>
        </tr>
    );
};

export default AnswerRow;