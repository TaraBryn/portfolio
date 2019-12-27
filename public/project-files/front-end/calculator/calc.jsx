$(document).ready(function(){
    //redux
    const FLOATING_POINT = '((?:[0-9]*\.?[0-9]+)|(?:[0-9]+\.?[0-9]*))';
    const OUTPUT = 'OUTPUT';
    const INPUT = 'INPUT';
    const PARSE = 'PARSE';
    const CLEAR = 'CLEAR';
    const CLEAR_ALL = 'CLEAR_ALL';
    const INITIAL_STATE = {
      input: '0',
      expression: '',
      output: ''
    }
    
    //action generators
    function addToInput(input){
      return {
        type: INPUT,
        input
      }
    }
    function clearInput(){return {type: CLEAR};}
    function clearAllInput(){return {type: CLEAR_ALL};}
    function parseInput(input){
      return {
        type: PARSE,
        input
      };
    }
    function renderOutput(expression){
      return {
        type: OUTPUT,
        expression
      }
    }
    function updateOutput(){
      return function(dispatch, getState){
        dispatch(parseInput(getState().input));
        dispatch(renderOutput(getState().expression));
      }
    }
    function clearIO(all = false){
      return function(dispatch){
        if (all) dispatch(clearAllInput());
        else dispatch(clearInput());
        dispatch(parseInput(''));
        dispatch(renderOutput(''));
      }
    }
    function updateInput(input){
      return function(dispatch, getState){
        const OPERATORS = ['+', '-', '*', '/'];
        if (OPERATORS.indexOf(input) != -1) {
          dispatch(parseInput(getState().input));
          var evaluated;
          try {evaluated = math.evaluate(getState().expression);}
          catch {}
          const OUTPUT = getState().output;
          /*if (evaluated === OUTPUT) {
            dispatch(clearAllInput());
            dispatch(parseInput(getState().input));
            dispatch(renderOutput(getState().expression));
            dispatch(addToInput(OUTPUT));
            dispatch(addToInput(input));
          }
          else*/
          dispatch(addToInput(input));
        }
        else {
          dispatch(addToInput(input));
        }
      }
    }
    
    //state reducers
    function inputReducer(state = INITIAL_STATE.input, action){
      switch(action.type){
        case INPUT: //return state + action.input;
          const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
          const OPERATORS = ['+', '-', '*', '/'];
          const END_NUMBER = new RegExp(FLOATING_POINT + '$');
          if (state == '0')
            return OPERATORS.indexOf(OPERATORS) == -1 ? 
              String(action.input) : state + String(action.input);
          if (END_NUMBER.test(state)) {
            const MATCH = state.match(END_NUMBER);
            if(MATCH[0] == '0') {
              if (action.input == '0') return state;
              if (NUMBERS.indexOf(action.input) != -1)
                return state.substring(0, state.length - 1) + String(action.input);
              return state + String(action.input);
            }
            if (action.input == '.' && MATCH[0].indexOf('.') != -1) return state;
            return state + String(action.input);
          }
          if (OPERATORS.indexOf(state[state.length-1]) != -1 
              && OPERATORS.indexOf(action.input) != -1){
            if (action.input == '-') {
              if(OPERATORS.indexOf(state[state.length-2]) != -1)
                return state.substring(0, state.length-2) + action.input;
              return state + action.input;
            }
            if (OPERATORS.indexOf(state[state.length-2]) != -1){
              return state.substring(0,state.length-2) + action.input;
            }
            return state.substring(0, state.length - 1) + action.input;
            //if OPERATORS.indexOf(state[state.length-2] != -1) return 
          }
          return state + String(action.input)
        case CLEAR:
          const CLEAR_REGEX = /((log\()|(ln\()|(pi)|(sqrt\()|((arc)?(sin|cos|tan)\())$/;
          if (CLEAR_REGEX.test(state))
            return state.replace(CLEAR_REGEX, '');
          return state.substring(0, state.length - 1);
        case CLEAR_ALL: return '0';
        default: return state;
      }
    }
    function expressionReducer(state = INITIAL_STATE.expression, action){
      switch(action.type){
        case PARSE:
          const NUMBER = '(' + FLOATING_POINT + '|e|pi)';
          const DEGREE = new RegExp(NUMBER + '°', 'g');
          const ROOT = new RegExp(NUMBER + '√' + NUMBER, 'g');
          const ROOT2 = new RegExp(NUMBER + '√\\(' + NUMBER + '\\)', 'g');
          const LOG = new RegExp('log\\(' + NUMBER + '\\)', 'g');
          const ARC = /(?:arc(sin|cos|tan))/;
          return action.input.replace(DEGREE, '*(pi/180)').replace(ROOT, (match, p1, p2)=>`nthRoot(${p2},${p1})`).replace(LOG, (match, p1)=>`log(${p1})/log(10)`).replace(ARC, (match, p1)=>`a${p1}`).replace(ROOT2, (match, p1, p2)=>`nthRoot(${p2},${p1})`).replace('π','pi').replace('ln', 'log');
        default: return state;
      }
    }
    function outputReducer(state = INITIAL_STATE.output, action){
      switch(action.type){
        case OUTPUT:
          try {
            return action.expression == '' ? '' : `${math.evaluate(action.expression)}`;
          }
          catch {return 'undefined';}
        default: return state;
      }
    }
    
    const rootReducer = Redux.combineReducers({input: inputReducer, expression: expressionReducer, output: outputReducer});
    const store = Redux.createStore(rootReducer, INITIAL_STATE, Redux.applyMiddleware(ReduxThunk.default));
    
    //react
    class OutputDisplay extends React.Component{
      constructor(props){
        super(props);
      }
      render(){
        return(
          <div id='output' class='text-right'>
            {this.props.output}
          </div>
        );
      }
    }
    class InputDisplay extends React.Component{
      constructor(props){
        super(props);
      }
      render(){
        return(
          <div id='input' class='text-right'>
            {this.props.input}
          </div>
        );
      }
    }
    class Display extends React.Component{
      constructor(props){
        super(props);
      }
      render(){
        return(
          <div id='display' class='text-right'>
            {this.props.output == '' ? this.props.input : this.props.output}
          </div>
        );
      }
    }
    class Button extends React.Component{
      constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
        if (this.props.handler)
          this.props.handler = this.props.handler.bind(this);
      }
      handler(){
        this.props.addToInput(this.props.element);
      }
      render(){
        return(
          <button
            id={this.props.id}
            class={`btn${this.props.class}`}
            onClick={this.props.handler ? this.props.handler : this.handler}
            dangerouslySetInnerHTML={{__html: `<div>${this.props.html}</div>`}}
            style={this.props.class ? {} : {border: '1px solid lightgrey'}}/>
        );
      }
    }
    
    //ReactRedux
    const Provider = ReactRedux.Provider
    const connect = ReactRedux.connect
    
    function mapStateToOutput(state){
      return {output: state.output};
    }
    function mapStateToInput(state){
      return {input: state.input};
    }
    function mapStateToProps(state){
      return {
        input: state.input,
        output: state.output
      };
    }
    function mapDispatchToProps(dispatch){
      return{
        addToInput: input => dispatch(updateInput(input)),
        clear: () => dispatch(clearIO(false)),
        clearAll: () => dispatch(clearIO(true)),
        equals: () => dispatch(updateOutput())
      };
    }
    
    const InputConnection = connect(mapStateToInput, null)(InputDisplay);
    const OutputConnection = connect(mapStateToOutput, null)(OutputDisplay);
    const DisplayConnection = connect(mapStateToProps, null)(Display);
    const ButtonConnection = connect(null, mapDispatchToProps)(Button);
    
    class Left extends React.Component{
      constructor(props){
        super(props);
      }
      render(){
        const BUTTONS = [
          {
            id: 'clear',
            element: 'AC',
            class: 'btn-danger',
            handler: function(){this.props.clearAll();}
          },
          {
            id: 'ce',
            element: 'CE',
            class: 'btn-danger',
            handler: function(){this.props.clear();}
          },
          {
            id: 'open-paren',
            element: '('
          },
          {
            id: 'close-paren',
            element: ')'
          },
          {
            id: 'add',
            element: '+'
          },
          {
            id: 'subtract',
            element: '-'
          },
          {
            id: 'multiply',
            element: '*'
          },
          {
            id: 'divide',
            element: '/'
          },
          {
            id: 'decimal',
            element: '.'
          },
          {
            id: 'zero',
            element: 0
          },
          {
            id: 'one',
            element: 1
          },
          {
            id: 'two',
            element: 2
          },
          {
            id: 'three',
            element: 3
          },
          {
            id: 'four',
            element: 4
          },
          {
            id: 'five',
            element: 5
          },
          {
            id: 'six',
            element: 6
          },
          {
            id: 'seven',
            element: 7
          },
          {
            id: 'eight',
            element: 8
          },
          {
            id: 'nine',
            element: 9
          }
        ];
        return(
          <div id='left'>
            {
              BUTTONS.map(e=>{
                return (
                  <ButtonConnection
                    id={e.id}
                    element={e.element}
                    html={e.element}
                    class={e.class ? ' ' + e.class : ''}
                    handler={e.handler ?  e.handler : null}/>
                );
              })
            }
          </div>
        );
      }
    }
    class Middle extends React.Component{
      constructor(props){
        super(props);
      }
      render(){
        const BUTTONS = [
          {
            id: 'square',
            element: '^(2)',
            html: 'x<sup>2</sup>'
          },
          {
            id: 'sqrt',
            element: 'sqrt(',
            html: '<sup>2</sup>√x'
          },
          {
            id: 'inverse',
            element: '^(-1)',
            html: 'x<sup>-1</sup>'
          },
          {
            id: 'equals',
            element: '=',
            html: '=',
            handler: function(){this.props.equals();}
          }
        ];
        return(
          <div id='middle'>
            {
              BUTTONS.map(e=>{
                return (
                  <ButtonConnection
                    id={e.id}
                    element={e.element}
                    html={e.html}
                    class={e.class ? e.class : ''}
                    handler={e.handler ? e.handler : null}/>
                );
            })}
          </div>
        );
      }
    }
    class Right extends React.Component{
      constructor(props){
        super(props);
      }
      render(){
        const BUTTONS=[
          {
            id: 'power',
            element: '^',
            html: 'x<sup>n</sup>'
          },
          {
            id: 'root',
            element: '√',
            html: '<sup>n</sup>√x'
          },
          {
            id: 'mod',
            element: '%',
            html: '%'
          },
          {
            id: 'ln',
            element: 'ln(',
            html: 'ln(x)'
          },
          {
            id: 'log',
            element: 'log(',
            html: 'log(x)',
            class: 'trig'
          },
          {
            id: 'sin',
            element: 'sin(',
            html: 'sin(x)',
            class: 'trig'
          },
          {
            id: 'cos',
            element: 'cos(',
            html: 'cos(x)',
            class: 'trig'
          },
          {
            id: 'tan',
            element: 'tan(',
            html: 'tan(x)',
            class: 'trig'
          },
          {
            id: 'arcsin',
            element: 'arcsin(',
            html: 'sin<sup>-1</sup>(x)',
            class: 'arctrig'
          },
          {
            id: 'arccos',
            element: 'arccos(',
            html: 'cos<sup>-1</sup>(x)',
            class: 'arctrig'
          },
          {
            id: 'arctan',
            element: 'arctan(',
            html: 'tan<sup>-1</sup>(x)',
            class: 'arctrig'
          },
          {
            id: 'pi',
            element: 'π',
            html: 'π'
          },
          {
            id: 'e',
            element: 'e',
            html: 'e'
          },
          {
            id: 'deg',
            element: '°',
            html: '°'
          },
          {
            id: 'factorial',
            element: '!',
            html: '!'
          }
        ];
        return(
          <div id='right'>
            {
              BUTTONS.map(e=>{
                return(
                  <ButtonConnection
                    id={e.id}
                    element={e.element}
                    html={e.html}
                    class={e.class ? ' ' + e.class : ''}/>
                );
              })
            }
          </div>
        );
      }
    }
    
    class ButtonWrapper extends React.Component{
      render(){
        return(
          <div id='button-wrapper'>
            <Left/>
            <Middle/>
            <Right/>
          </div>
        );
      }
    }
    
    class Calculator extends React.Component{
      constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
      }
      componentDidMount(){document.addEventListener('keydown',this.handler);}
      componentWillUnmont(){document.removeEventListener('keydown');}
      handler(e){
        switch(e.keyCode){
          case 8: 
            this.props.clear();
            break;
          case 27:
            this.props.clearAll();
            break;
          case 13:
            this.props.equals();
            break;
        }
        if ((e.keyCode >= 48 && e.keyCode <= 57)
           || (e.keyCode >= 65 && e.keyCode <= 90)
           || (e.keyCode >= 96 && e.keyCode <= 107)
           || ['+', '-', '*', '^', '%', '!', '.', '(', ')'].indexOf(e.key) != -1)
          this.props.addToInput(e.key);
        if (e.key == '=') this.props.equals();
      }
      render(){
        return(
          <div id='calculator'>
            <h1 id='header'>Electronic Calculator</h1>
            <div id='display' class='text-right'>
              <OutputConnection/>
              <InputConnection/>
            </div>
            <ButtonWrapper/>
          </div>
        );
      }
    }
    
    const CalculatorConnection = connect(null, mapDispatchToProps)(Calculator);
    
    class Wrapper extends React.Component{
      render(){
        return(
          <Provider store={store}>
            <CalculatorConnection/>
          </Provider>
        );
      }
    }
    
    ReactDOM.render(<Wrapper/>,$('#project-body')[0]);
  });