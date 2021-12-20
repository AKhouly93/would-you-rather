import { connect } from 'react-redux';
import '../App.css';

function PageNotFound (props)
{
    return (
        <div style={{marginTop: '100px', textAlign: 'center'}}>
            <h1 style={{color: 'red', fontSize: '40px' }}>404</h1>
            <p>The requested URL cannot be found. </p>
        </div>
    );
}

export default connect()(PageNotFound);
