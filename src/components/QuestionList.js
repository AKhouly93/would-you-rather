import { connect } from "react-redux";
import Question from "./Question";
import { useState, Fragment } from "react";

import '../App.css'

function QuestionList (props) {
const [option, setOption] = useState('A');
const handleChangeCategory =(value)=>{
setOption(value);
}
  if (props.hasLoaded){

    return (
      <div className="question-list-page">
        <div>
          <select value={option} onChange={(e)=>{handleChangeCategory(e.target.value)}}>
            <option value="A">Un answered questions</option>
            <option value="B">answered questions</option>
          </select>
        </div>
        {option === "A" ?
        <Fragment>
        <h3>Un Answered Questions</h3>
        <div className="question-list">
             {props.unAnsweredQuestionsIds.map((qid)=> (
                 <div key={qid}>
                     <Question qid={qid} answered={false}/>
                 </div>
              ))}
         </div>
        </Fragment> 
        : 
        <Fragment>
         <h3>Answered Questions</h3>
        <div className="question-list">
              {props.answeredQuestionsIds.map((qid)=> (
                 <div key={qid}>
                     <Question qid={qid} answered={true}/>
                 </div>
              ))}
         </div>
        </Fragment>}
      </div>   
  )
  }else{
    return(<h3 style={{textAlign: 'center'}}>Please Wait..</h3>)
  }
  }

  function mapStateToProps(state){
    const {users, questions, authedUser }= state;
    const user = users[state.authedUser];
    const answeredQuestionsIds = Object.keys(user.answers).sort((a,b)=>
          questions[b]['timestamp']-questions[a]['timestamp']);
    const unAnsweredQuestionsIds = Object.keys(questions).filter(qid => !answeredQuestionsIds.includes(qid)).sort((a,b) =>
          questions[b]['timestamp'] - questions[a]['timestamp']);
    return {
      hasLoaded: authedUser !== null ? true : false,
      answeredQuestionsIds,
      unAnsweredQuestionsIds,
    }
  }

  export default connect(mapStateToProps)(QuestionList);