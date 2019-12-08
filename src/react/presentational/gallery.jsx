$(function(){
    $.ajax({
        url: '/projects/front-end'
    })
    .then(front_end => {
        const Component = React.Component;
        class Gallery extends Component{
            render(){
                return(
                    <div class="gallery-container">
                        {front_end.map(e=>{
                            console.log(e.image)
                            return(
                                <div 
                                class='project-container'
                                style={{"background-image": `url('/images/${e.image}')`}}>
                                    {/*<img src={'/images/' + e.image}/>*/}
                                    <div class='overlay'> Test</div>
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