import { initializeApp, postQuestionToDb, postAnswerToDb } from "../utils/api";


export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER"
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const POST_QUESTION = 'POST_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
/*Async action creator returns a function not a plain JS object. we use Thunk middleware
 to itercept this kind of actions before being dispatched*/
export function handleInitializeApp (){
    return (dispatch )=>{
        return initializeApp().then ((res)=>{
            //dispatching the action to the reducers to change the state.
            dispatch(receiveUsers(res.users));
            dispatch(receiveQuestions(res.questions));
        })
    }
}

//Questions action creator;

export function handlePostQuestion(question){
    return(dispatch)=>{
        return postQuestionToDb(question).then((returnedQuestion)=>{
            dispatch(postQuestion(returnedQuestion));
            //we need to add question to user so that it can be counted on leaderboard... etc.
            const payLoad = {
                authedUser :question.author,
                qid: returnedQuestion.id,
            }
            dispatch(addQuestionToUser(payLoad));
        });
    };
}

function postQuestion (question){
    return {
        type: POST_QUESTION,
        question
    }
}

function receiveQuestions (questions){
    return { type: RECEIVE_QUESTIONS, questions }
}



export function handleAnswerQuestion({ authedUser, qid, answer }) {
    return (dispatch) => {
      return postAnswerToDb({ authedUser, qid, answer }).then(() => {
        dispatch(answerQuestion({ authedUser, qid, answer }));
        dispatch(addAnswerToUser({ authedUser, qid, answer }));
      });
    };
  }
  

function answerQuestion({ authedUser, qid, answer }) {
    return { type: ANSWER_QUESTION, authedUser, qid, answer };
  };


// users action creators
function receiveUsers (users){
    return { type: RECEIVE_USERS, users }
}

function addQuestionToUser(payLoad) {
    const {authedUser, qid} = payLoad;
    return { type: ADD_QUESTION_TO_USER, authedUser, qid };
  }
  
function addAnswerToUser({ authedUser, qid, answer }) {
    return { type: ADD_ANSWER_TO_USER, answer, qid, authedUser };
  }
  

//authedUser action
export function setAuthedUser (id){
    return { type: SET_AUTHED_USER, id }
}


