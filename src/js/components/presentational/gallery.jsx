import { front_end } from 'root/public/js/projects.js';
import {react, Component} from 'react';
import ReactDOM from 'react-dom'

class Gallery extends Component{
    render(){
        console.log(front_end)
        return(
            <p>test app 2</p>
        );
    }
}

ReactDOM.render(<Gallery/>, $("#gallery-container")[0]);