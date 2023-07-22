import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'
import axios from "axios";

const HomeMainbar = () => {

    const location = useLocation()
    const user = 1;
    const navigate = useNavigate()

    React.useEffect(() => {
        axios.get("http://localhost:5050").then((response) => {
            questionsList=response.data;
        //   console.log(response.data);
        });
      }, []);

    let questionsList = useSelector(state => state.questionsReducer)

    const checkAuth = () => {
        if(user === null){
            alert("login or signup to ask a question")
            navigate('/Auth')
        }else{
            navigate('/AskQuestion')
        }
    }

    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                {
                    location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
                }
                <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
            </div>
            <div  style={{ padding: "12px"}}>
                {
                    questionsList.data === null ?
                    <h1>Loading...</h1> :
                    <>
                        <p style={{ padding: "12px"}}>{ questionsList.data.length } questions</p>
                        <QuestionList questionsList={questionsList.data} />
                    </>
                }
            </div>
        </div>
    )
}

export default HomeMainbar