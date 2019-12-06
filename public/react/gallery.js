import htm from '../js/htm.module.js';
const html = htm.bind(React.createElement)
$(function(){
    $.ajax({
        url: '/projects/front-end'
    })
    .then(front_end => {
        const Component = React.Component;
        class Gallery extends Component{
            render(){
                console.log('test')
                return(
                    html`<div class="gallery-container">
                        {front_end.map(e=>{
                            return(
                                <div class='front-end'>
                                    {e.name}
                                </div>
                            )
                        })}
                    </div>`
                );
            }
        }

        ReactDOM.render(html`<Gallery/>`, $("#gallery-container")[0]);
    })
    
});