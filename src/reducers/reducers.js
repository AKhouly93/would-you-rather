import { 
    SET_AUTHED_USER,
    RECEIVE_QUESTIONS,
    ANSWER_QUESTION,
    POST_QUESTION,
    RECEIVE_USERS,
    ADD_QUESTION_TO_USER,
    ADD_ANSWER_TO_USER,
} from '../actions/actionCreators';
    //Users reducer
    export  function users(state = {}, action) {
        switch (action.type) {
          case RECEIVE_USERS:
            return {
                 ...state, ...action.users 
                };
          case ADD_QUESTION_TO_USER:
            return {
              ...state,
              [action.authedUser]: {
                ...state[action.authedUser],
                questions: [...state[action.authedUser].questions, action.qid]
              }
            };
          case ADD_ANSWER_TO_USER:
            return {
              ...state,
              [action.authedUser]: {
                ...state[action.authedUser],
                answers: {
                  ...state[action.authedUser].answers,
                  [action.qid]: action.answer
                }
              }
            };
          default:
            return state;
        }
      }


    //Questions reducer
      export  function questions(state = {}, action) {
        switch (action.type) {
          case RECEIVE_QUESTIONS:
            return { ...state, ...action.questions };
          case POST_QUESTION:
            const { question } = action;
            return { ...state,
                 [question.id]: question
                };
            case ANSWER_QUESTION:
                const { authedUser, qid, answer } = action;
                return {
                  ...state,
                  [qid]: {
                    ...state[qid],
                    [answer]: {
                      ...state[qid][answer],
                      votes: [...state[qid][answer].votes, authedUser]
                    }
                  }
                };
          default:
            return state;
        }
      }
      

    //Authed user
    export function authedUser (state = null, action){
        switch (action.type){
            case SET_AUTHED_USER:
                return action.id;
            default:
                return state; 
        }
    }
    