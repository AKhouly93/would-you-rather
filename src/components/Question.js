import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import '../App.css';

function Question (props) {
    console.log('Question Component: ', props.questions[props.qid]);
    const question = props.questions[props.qid];
    const authorId = question.author;
    const { avatarURL, name } = props.users[authorId];
    return (
        <div>
         <div className="card">
             <div className="card-title">
                <h4>{name} asks:</h4>
             </div>
             <div className="card-body">
                 <div className= "card-image">
                 <img src={avatarURL} alt="Avatar"></img>
                 </div>
                 <div className="card-text">
                    <h5>Would you rather..</h5>
                    <br></br>
                    <p>{question.optionOne.text}, or {question.optionTwo.text}?</p>

                 </div>
             </div>
             <div className= "card-button">
               <Link to={`/questions/${props.qid}`}> 
                  <button>{props.answered ? "Show Details..." : "Answer"}</button>
               </Link>
             </div>
            </div>
        </div>
    );
  }

  const mapStateToProps = ({ questions, users, authedUser }, { qid })=>{
    return {
      questions,
      users,
      authedUser,
      qid
    }
  }
  export default connect(mapStateToProps)(Question);