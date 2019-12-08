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
                                <div class='project-container'>
                                    {/*<img src={'/images/' + e.image}/>*/}
                                    <div
                                    class='overlay'
                                    style={{"background-image": "/images/" + e.image}}>
                                        Test
                                    </div>
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