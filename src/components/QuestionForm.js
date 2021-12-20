import { connect } from 'react-redux';
import { useState } from 'react';
import { handlePostQuestion } from '../actions/actionCreators';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function QuestionForm (props){
    const { dispatch, author } = props;
    const [optionOneText, setOptionOne] = useState('');
    const [optionTwoText, setOptionTwo] = useState('');
    const navigate = useNavigate();
    const handleUpdateOptionOne = (value) =>{
        setOptionOne(value);
    }
    const handleUpdateOptionTwo = (value) =>{
        setOptionTwo(value);
    }
    const handleSubmit=()=>{
        if (optionOneText.trim() !=='' && optionTwoText.trim() !== '')
        {
            dispatch(handlePostQuestion({ optionOneText, optionTwoText, author }));
            setOptionOne('');
            setOptionTwo('');
            alert('Question added.. You will be directed to homepage.')
            navigate('/')
        }
        else
        {
            alert('Please, provide two options!')
        }
    }
    return (
        <div>
            <h3>Would you rather</h3>
            <input
                        type="text" 
                        placeholder="Option one.."
                        value = {optionOneText}
                        onChange ={(e)=>{handleUpdateOptionOne(e.target.value)}}
            />
            <h5>Or</h5>
            <input
                        type="text" 
                        placeholder="Option two.."
                        value = {optionTwoText}
                        onChange ={(e)=>{handleUpdateOptionTwo(e.target.value)}}
            />
            <button onClick={()=> {handleSubmit()}} >Post Question</button>
        </div>
        
    );
}
function mapStateToProps(state){
    return{
     author: state.authedUser
    }
  }
export default connect(mapStateToProps)(QuestionForm);
