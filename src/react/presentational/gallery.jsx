$(function(){
    $.ajax({
        url: '/projects/front-end'
    })
    .then(front_end => {
        console.log(front_end)
        const Component = React.Component;
        class Gallery extends Component{
            render(){
                return(
                    <div class="gallery-container">
                        {front_end.map(e=>{
                            return(
                                <div class='project-container'>
                                    <img src={'/images/' + e.image}/>
                                    <div class='overlay'>Test</div>
                                </div>
                            )
                        })}
                    </div>
                );
            }
        }

        ReactDOM.render(<Gallery/>, $("#gallery-container")[0]);
    })
    
});