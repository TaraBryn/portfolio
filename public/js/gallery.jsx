import { front_end } from 'root/public/js/projects.js';
//import {react, Component} from 'react';
//import ReactDOM from 'react-dom'

class Gallery extends Component{
    render(){
        console.log(front_end)
        return(
            <div class="gallery-container">
                {front_end.map(e=>{
                    return(
                        <div class='front-end'>
                            {e.name}
                        </div>
                    )
                })}
            </div>
        );
    }
}

ReactDOM.render(<Gallery/>, $("#gallery-container")[0]);