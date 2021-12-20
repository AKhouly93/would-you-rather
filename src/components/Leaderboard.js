import { connect } from 'react-redux';
import '../leaderboard.css'
import '../App.css'
import icon from '../images/cup.png'
function Leaderboard (props)
{
    
    return (
        <div className="leaderboard">
            <div className="leaderboard-title">
                <img src={icon} alt="leaderboard"></img>
                <h3>Leaderboard</h3>
            </div>
            {props.rankedUsers.map((rankedUser)=>(
            <div key={rankedUser.id}>
                <div className="leader-card">
                <div className="leader-card-title">
                    {rankedUser.name}
                </div>
                <div className="card-body">
                    <div className="rank">
                    {props.rankedUsers.indexOf(rankedUser) + 1}
                    </div>
                    <div className="card-image">
                    <img src={rankedUser.avatar} alt="avatar"></img>
                    </div>
                    <div className="middle">
                        <div className="answered-questions">
                        <div>Answered Questions </div><div style={{marginLeft: "10px"}}>{rankedUser.answeredQuestions}</div>
                        </div>
                        <div className="asked-questions">
                            <div>Asked Questions</div><div>{rankedUser.askedQuestions}</div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="score">
                            Score
                        </div>
                        <div>
                            {rankedUser.score}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            ))}
    </div>
    );
}
function mapStateToProps({ users }){
    //this is an array of new user object contains the data we need to rank
    const tempUsers = Object.values(users).map((user)=>{
        const  name= user.name;
        const avatar= user.avatarURL;
        const answeredQuestions =  Object.keys(user.answers).length;
        const askedQuestions = user.questions.length;
        const score = answeredQuestions + askedQuestions;
        const id = user.id
        return {
            id,
            name,
            avatar,
            answeredQuestions,
            askedQuestions,
            score
        }
    }); 
    return{
        rankedUsers : tempUsers.sort((a,b)=> b.score - a.score)
    }
}
export default connect(mapStateToProps)(Leaderboard);
