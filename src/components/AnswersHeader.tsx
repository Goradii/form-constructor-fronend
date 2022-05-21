import { IAnswersHeader } from '../Interfaces';


const AnswersHeader = ({fields}:IAnswersHeader) => {
    fields = fields?.slice(0,5)
    return (
        <tr>
            {fields?.map(val => <th className='border-b-2 p-4 pl-8 text-left' key={val.id}>{val.title}</th>)}
            <th className='p-4 pl-8 border-b-2'></th>
        </tr>
    );
};

export default AnswersHeader;