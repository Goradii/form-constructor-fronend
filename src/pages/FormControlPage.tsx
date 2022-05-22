import { useParams } from 'react-router-dom'


const FormControlPage = () => {
    const { uid } = useParams<{ uid?: string }>()


    return (
        <div className='container h-screen max-w-xl'>
            <div className='container grid grid-cols-1 align-middle mt-48'>
                <a className='button-dark w-1/2 mx-auto my-5 py-2' href={'/'}>Create New Form</a>
                <a className='button-dark w-1/2 mx-auto my-5 py-2' href={`/form/${uid}`}>Answer To Created Form</a>
                <a className='button-dark w-1/2 mx-auto my-5 py-2' href={`/answers/${uid}`}>Answers Of Created Form</a>
            </div>
        </div>
    );
};

export default FormControlPage;
