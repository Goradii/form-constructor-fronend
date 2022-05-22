import {Route, Routes} from 'react-router-dom'
import AnswerPage from './pages/AnswerPage';
import AnswersPage from './pages/AnswersPage';
import FormConstructorPage from './pages/FormConstructorPage';
import FormControlPage from './pages/FormControlPage';
import FormPage from './pages/FormPage';


const AppRouter = () => {
    return (
        <Routes>
            <Route path='/'>
                <Route path=':uid'  element={<FormControlPage/>}></Route>
                <Route path='' element={<FormConstructorPage/>}></Route>
            </Route>
            <Route path='/form'>
                <Route path=':uid'  element={<FormPage/>}></Route>
            </Route>
            <Route path='/answers'>
                <Route path=':formUid'>
                    <Route path=':answerUid'  element={<AnswerPage/>}></Route>
                    <Route path='' element={<AnswersPage/>}></Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
