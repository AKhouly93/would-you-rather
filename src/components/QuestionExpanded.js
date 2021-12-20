import { connect } from 'react-redux';
import  { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import { handleAnswerQuestion } from '../actions/actionCreators'
function QuestionExpanded (props)
{
    const { question_id } = useParams();
    const navigate = useNavigate();
    const { authedUser, questions, users } = props;
    const question = questions[question_id];
    const answers = users[authedUser].answers;
    const [isAnswered, setIsAnswered]= useState(answers.hasOwnProperty(question_id));
    const author =  users[question.author];
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes= question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const optionOneVotesPercent = getPerecntage (optionOneVotes);
    const optionTwoVotesPercent = getPerecntage (optionTwoVotes);
    const votedForOptionOne = question.optionOne.votes.includes(authedUser);
    const votedForOptionTwo = question.optionTwo.votes.includes(authedUser);
    const [selectedOption, setSelectedOption]=useState('optionOne');
    const { dispatch } = props;
    function getPerecntage (votes){
        const result = Math.round((votes/totalVotes) * 100);
        return `${result}%`
    }
    
    useEffect(()=>{
        //beacuse of how the backend works we got an error when trying to fetch a user posted question
        //using id so we make sure to show error page if user tried to access such questions using url
        if (!question)
        {
            navigate('/404');
        }
  
    },[]);
    
    const handleSubmit=()=>{
        const qid = question_id;
        const answer = selectedOption;
        dispatch(handleAnswerQuestion({ authedUser, qid, answer }));
        setIsAnswered(true);
    };
    const handleChoose = (value) =>{
        setSelectedOption(value);
    }
   
    return (
        question && isAnswered ?    
        <div className="result">
            <div className="poll-title">
                <div>
                    <h3>{author.name} asked</h3>
                </div>
                <div calssName="image">
                    <img className="avatar" src={author.avatarURL} alt="Avatar"></img>
                </div>
            </div>
                <h5>would you rather...</h5>
                <div className={votedForOptionOne ? "selceted" : "option"}>
                <p>{`${question.optionOne.text} (${optionOneVotes} / ${totalVotes} votes`})</p>
                    <div className="progressbar">
                        <div style={{width: optionOneVotesPercent, textAlign: 'right'}}>{optionOneVotesPercent}</div>
                    </div>
                </div>
                <div className={votedForOptionTwo ? "selceted" : "option"}>
                    <p>{`${question.optionTwo.text} (${optionTwoVotes} / ${totalVotes} votes`})</p>
                    <div className="progressbar">
                        <div style={{width: optionTwoVotesPercent, textAlign: 'right'}}>{optionTwoVotesPercent}</div>
                    </div>
                </div>
            </div> 
    :
    <div className="result">
    <div className="poll-title">
        <div>
            <h3>{author.name} asked</h3>
        </div>
        <div calssName="image">
            <img className="avatar" src={author.avatarURL} alt="Avatar"></img>
        </div>
    </div>
        <h5>would you rather...</h5>
        <div className= "option">
        
                <div className="progressbar">
                
                <input onClick={(e)=>{handleChoose(e.target.value)}} id="optionOne" type="radio" value="optionOne" name="options" checked="true"></input>
                <label for="optionOne">{question.optionOne.text}</label>
                </div>
        </div>
        <div className= "option">
            <div className="progressbar">
            <input onClick={(e)=>{handleChoose(e.target.value)}} id="optionTwo" type="radio" value="optionTwo" name="options"></input>
            <label for="optionTwo">{question.optionTwo.text}</label>
            </div>
        </div>
        <button onClick={()=>{handleSubmit()}}>Send answer</button>
    </div> 
    );
    
    
}




const mapStateToProps = (store)=>{
    
    return {
      questions: store.questions,
      users: store.users,
      authedUser: store.authedUser
    }
  }
export default connect(mapStateToProps)(QuestionExpanded);
