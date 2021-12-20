import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from './_DATA.js'

export function initializeApp () {
  return Promise.all([_getUsers(),_getQuestions(),]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function postQuestionToDb (question) {
  return _saveQuestion(question);
}

export function postAnswerToDb ({ authedUser, qid, answer }) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}


