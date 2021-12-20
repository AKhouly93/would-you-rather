import { connect } from 'react-redux';
import '../App.css';
import { handleInitializeApp } from '../actions/actionCreators';
import { Component } from 'react';
import QuestionList from './QuestionList';
import { Route, Routes} from "react-router-dom";
import Nav from './Nav';
import Login from './Login';
import Leaderboard from './Leaderboard';
import QuestionForm from './QuestionForm';
import QuestionExpanded from './QuestionExpanded';
import PageNotFound from './PageNotFound';

class App extends Component{
componentDidMount(){
  this.props.dispatch(handleInitializeApp());
}
  render(){
    if(!this.props.loggedIn){
        return(
        <Routes>
          <Route path="*" element={<Login/>} />
      </Routes>)
    }
      return (  
        <div className="app">
        <Nav/>
        <div className="main">
        <Routes>
          <Route  path="/" element={<QuestionList/>} />
          <Route  path="/add" element={<QuestionForm/>} />
          <Route  path="/leaderboard" element={<Leaderboard/>} />
          <Route  path="/question/:question_id" element={<QuestionExpanded/>} />
          <Route  path="*" element={<PageNotFound/>} />
        </Routes>
        </div>
      </div>
      );
  }
}

function mapStateToProps(state){
  return{
    loggedIn: state.authedUser != null,
  }
}

export default connect(mapStateToProps)(App);
