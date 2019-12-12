$(document).ready(function(){
  
  //Redux
  const UPDATE = 'UPDATE';
  
  var reader = new FileReader();
  $.ajax('/project-files/front-end/markdown_previewer/mark.txt')
  .then(data => {

    var sanitize = require('sanitize-html-react');
    var marked = require('marked');
    const INITIAL_STRING = data;

    const INITIAL_STATE = {
      input: INITIAL_STRING,
      marked: marked(INITIAL_STRING)
    }
    
    //action generator
    function updateInput(input){
      return {
        type: UPDATE,
        input
      };
    }
    //input reducer
    function inputRedux(state = INITIAL_STATE, action){
      switch(action.type){
        case UPDATE:
          return {
            input: action.input,
            marked: marked(action.input)
          };
        default: return state;
      };
    }
    
    const store = Redux.createStore(inputRedux);
    
    //React
    class Editor extends React.Component{
      constructor(props){
        super(props);
        this.changeHandler = this.changeHandler.bind(this);
      }
      changeHandler(e){this.props.updateInput(e.target.value);}
      render(){
        return (
        <textarea
            id="editor"
            onChange={this.changeHandler}
              value={this.props.input}>
        </textarea>);
      }
    }
    
    class Preview extends React.Component{
      constructor(props){
        super(props);
      }
      tabHandler(e){
        $(".tabcontent").css("display","none");
        $(".tablinks").removeClass("active");
        $(`#${e.target.id.split("-")[0]}`).css("display","block");
        e.target.className += " active";
      }
      render(){
        return (
          <div id="preview-wrapper">
            <div class="tab">
              <button 
                class="tablinks" 
                id="preview-btn"
                onClick={this.tabHandler}>
                Preview
              </button>
              <button 
                class="tablinks" 
                id="html-btn"
                onClick={this.tabHandler}>
                HTML
              </button>
            </div>
            <div
              id="preview"
              dangerouslySetInnerHTML={{__html: sanitize(this.props.marked)}}
              className="tabcontent"></div>
            <div 
              id="html" 
              className="tabcontent hljs">
                <pre>
                  <code
                  className='hljs'
                  dangerouslySetInnerHTML={{__html: hljs.highlight('html', sanitize(this.props.marked)).value}}>
                  </code>
                </pre>
            </div>
          </div>
        );
      }
    }
    
    //React-Redux
    
    const Provider = ReactRedux.Provider;
    const connect = ReactRedux.connect;
    
    function mapStateToEditor(state){
      return {input: state.input};
    }
    
    function mapStateToPreview(state){
      return {marked: state.marked};
    }
    
    function mapDispatchToEditor(dispatch){
      return {
        updateInput:
        input=>dispatch(updateInput(input))
      };
    }
    
    const EditorConnection = connect(mapStateToEditor, mapDispatchToEditor)(Editor);
    
    const PreviewConnection = connect(mapStateToPreview, null)(Preview);
    
    class App extends React.Component{
      render(){
        return (
          <div id="app">
            <EditorConnection/>
            <PreviewConnection/>
          </div>
        );
      }
    }
    
    class Wrapper extends React.Component{
      render(){
        return (
          <Provider store = {store}>
            <App/>
          </Provider>
        );
      }
    }
    
    ReactDOM.render(<Wrapper/>, $("#markdown-container")[0]);
    
    $("#preview").css("display","block");

  })
  .catch(e=>console.log(e));
  
});