var sanitize = require('sanitize-html-react');
var marked = require('marked');

$(document).ready(function(){
    //Redux
    const UPDATE = 'UPDATE';
    
    var reader = new FileReader();
    const INITIAL_STRING = $.ajax('/project-files/front-end/markdown_previewer/mark.txt');
    
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
      }
      render(){
        return (
        <textarea
            id="editor"
            onChange={e=>this.props.updateInput(e.target.value)}
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
            <div id="html" className="tabcontent">
              {this.props.marked}
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
    
    class Container extends React.Component{
      render(){
        return (
          <div id="container">
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
            <Container/>
          </Provider>
        );
      }
    }
    
    ReactDOM.render(<Wrapper/>, $("#wrapper")[0]);
    
    $("#preview").css("display","block");
    
  });