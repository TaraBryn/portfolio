/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/project-files/front-end/calculator/calc.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/redux-thunk/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/redux-thunk/es/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createThunkMiddleware(extraArgument) {\n  return function (_ref) {\n    var dispatch = _ref.dispatch,\n        getState = _ref.getState;\n    return function (next) {\n      return function (action) {\n        if (typeof action === 'function') {\n          return action(dispatch, getState, extraArgument);\n        }\n\n        return next(action);\n      };\n    };\n  };\n}\n\nvar thunk = createThunkMiddleware();\nthunk.withExtraArgument = createThunkMiddleware;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (thunk);\n\n//# sourceURL=webpack:///./node_modules/redux-thunk/es/index.js?");

/***/ }),

/***/ "./public/project-files/front-end/calculator/calc.jsx":
/*!************************************************************!*\
  !*** ./public/project-files/front-end/calculator/calc.jsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ReduxThunk = __webpack_require__(/*! redux-thunk */ \"./node_modules/redux-thunk/es/index.js\").default;\n\n$(document).ready(function () {\n  //redux\n  const FLOATING_POINT = '((?:[0-9]*\\.?[0-9]+)|(?:[0-9]+\\.?[0-9]*))';\n  const OUTPUT = 'OUTPUT';\n  const INPUT = 'INPUT';\n  const PARSE = 'PARSE';\n  const CLEAR = 'CLEAR';\n  const CLEAR_ALL = 'CLEAR_ALL';\n  const INITIAL_STATE = {\n    input: '0',\n    expression: '',\n    output: ''\n  }; //action generators\n\n  function addToInput(input) {\n    return {\n      type: INPUT,\n      input\n    };\n  }\n\n  function clearInput() {\n    return {\n      type: CLEAR\n    };\n  }\n\n  function clearAllInput() {\n    return {\n      type: CLEAR_ALL\n    };\n  }\n\n  function parseInput(input) {\n    return {\n      type: PARSE,\n      input\n    };\n  }\n\n  function renderOutput(expression) {\n    return {\n      type: OUTPUT,\n      expression\n    };\n  }\n\n  function updateOutput() {\n    return function (dispatch, getState) {\n      dispatch(parseInput(getState().input));\n      dispatch(renderOutput(getState().expression));\n    };\n  }\n\n  function clearIO(all = false) {\n    return function (dispatch) {\n      if (all) dispatch(clearAllInput());else dispatch(clearInput());\n      dispatch(parseInput(''));\n      dispatch(renderOutput(''));\n    };\n  }\n\n  function updateInput(input) {\n    return function (dispatch, getState) {\n      const OPERATORS = ['+', '-', '*', '/'];\n\n      if (OPERATORS.indexOf(input) != -1) {\n        dispatch(parseInput(getState().input));\n        var evaluated;\n\n        try {\n          evaluated = math.evaluate(getState().expression);\n        } catch {}\n\n        const OUTPUT = getState().output;\n        dispatch(addToInput(input));\n      } else {\n        dispatch(addToInput(input));\n      }\n    };\n  } //state reducers\n\n\n  function inputReducer(state = INITIAL_STATE.input, action) {\n    switch (action.type) {\n      case INPUT:\n        //return state + action.input;\n        const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];\n        const OPERATORS = ['+', '-', '*', '/'];\n        const END_NUMBER = new RegExp(FLOATING_POINT + '$');\n        if (state == '0') return OPERATORS.indexOf(OPERATORS) == -1 ? String(action.input) : state + String(action.input);\n\n        if (END_NUMBER.test(state)) {\n          const MATCH = state.match(END_NUMBER);\n\n          if (MATCH[0] == '0') {\n            if (action.input == '0') return state;\n            if (NUMBERS.indexOf(action.input) != -1) return state.substring(0, state.length - 1) + String(action.input);\n            return state + String(action.input);\n          }\n\n          if (action.input == '.' && MATCH[0].indexOf('.') != -1) return state;\n          return state + String(action.input);\n        }\n\n        if (OPERATORS.indexOf(state[state.length - 1]) != -1 && OPERATORS.indexOf(action.input) != -1) {\n          if (action.input == '-') {\n            if (OPERATORS.indexOf(state[state.length - 2]) != -1) return state.substring(0, state.length - 2) + action.input;\n            return state + action.input;\n          }\n\n          if (OPERATORS.indexOf(state[state.length - 2]) != -1) {\n            return state.substring(0, state.length - 2) + action.input;\n          }\n\n          return state.substring(0, state.length - 1) + action.input; //if OPERATORS.indexOf(state[state.length-2] != -1) return\n        }\n\n        return state + String(action.input);\n\n      case CLEAR:\n        const CLEAR_REGEX = /((log\\()|(ln\\()|(pi)|(sqrt\\()|((arc)?(sin|cos|tan)\\())$/;\n        if (CLEAR_REGEX.test(state)) return state.replace(CLEAR_REGEX, '');\n        return state.substring(0, state.length - 1);\n\n      case CLEAR_ALL:\n        return '0';\n\n      default:\n        return state;\n    }\n  }\n\n  function expressionReducer(state = INITIAL_STATE.expression, action) {\n    switch (action.type) {\n      case PARSE:\n        const NUMBER = '(' + FLOATING_POINT + '|e|pi)';\n        const DEGREE = new RegExp(NUMBER + '°', 'g');\n        const ROOT = new RegExp(NUMBER + '√' + NUMBER, 'g');\n        const ROOT2 = new RegExp(NUMBER + '√\\\\(' + NUMBER + '\\\\)', 'g');\n        const LOG = new RegExp('log\\\\(' + NUMBER + '\\\\)', 'g');\n        const ARC = /(?:arc(sin|cos|tan))/;\n        return action.input.replace(DEGREE, '*(pi/180)').replace(ROOT, (match, p1, p2) => `nthRoot(${p2},${p1})`).replace(LOG, (match, p1) => `log(${p1})/log(10)`).replace(ARC, (match, p1) => `a${p1}`).replace(ROOT2, (match, p1, p2) => `nthRoot(${p2},${p1})`).replace('π', 'pi').replace('ln', 'log');\n\n      default:\n        return state;\n    }\n  }\n\n  function outputReducer(state = INITIAL_STATE.output, action) {\n    switch (action.type) {\n      case OUTPUT:\n        try {\n          return action.expression == '' ? '' : `${math.evaluate(action.expression)}`;\n        } catch {\n          return 'undefined';\n        }\n\n      default:\n        return state;\n    }\n  }\n\n  const rootReducer = Redux.combineReducers({\n    input: inputReducer,\n    expression: expressionReducer,\n    output: outputReducer\n  });\n  const store = Redux.createStore(rootReducer, INITIAL_STATE, Redux.applyMiddleware(ReduxThunk)); //react\n\n  class OutputDisplay extends React.Component {\n    constructor(props) {\n      super(props);\n    }\n\n    render() {\n      return React.createElement(\"div\", {\n        id: \"output\",\n        class: \"text-right\"\n      }, this.props.output);\n    }\n\n  }\n\n  class InputDisplay extends React.Component {\n    constructor(props) {\n      super(props);\n    }\n\n    render() {\n      return React.createElement(\"div\", {\n        id: \"input\",\n        class: \"text-right\"\n      }, this.props.input);\n    }\n\n  }\n\n  class Display extends React.Component {\n    constructor(props) {\n      super(props);\n    }\n\n    render() {\n      return React.createElement(\"div\", {\n        id: \"display\",\n        class: \"text-right\"\n      }, this.props.output == '' ? this.props.input : this.props.output);\n    }\n\n  }\n\n  class Button extends React.Component {\n    constructor(props) {\n      super(props);\n      this.handler = this.handler.bind(this);\n      if (this.props.handler) this.props.handler = this.props.handler.bind(this);\n    }\n\n    handler() {\n      this.props.addToInput(this.props.element);\n    }\n\n    render() {\n      return React.createElement(\"button\", {\n        id: this.props.id,\n        class: `btn${this.props.class} calc-button`,\n        onClick: this.props.handler ? this.props.handler : this.handler,\n        dangerouslySetInnerHTML: {\n          __html: `<div>${this.props.html}</div>`\n        },\n        style: this.props.class ? {} : {\n          border: '1px solid lightgrey'\n        }\n      });\n    }\n\n  } //ReactRedux\n\n\n  const Provider = ReactRedux.Provider;\n  const connect = ReactRedux.connect;\n\n  function mapStateToOutput(state) {\n    return {\n      output: state.output\n    };\n  }\n\n  function mapStateToInput(state) {\n    return {\n      input: state.input\n    };\n  }\n\n  function mapStateToProps(state) {\n    return {\n      input: state.input,\n      output: state.output\n    };\n  }\n\n  function mapDispatchToProps(dispatch) {\n    return {\n      addToInput: input => dispatch(updateInput(input)),\n      clear: () => dispatch(clearIO(false)),\n      clearAll: () => dispatch(clearIO(true)),\n      equals: () => dispatch(updateOutput())\n    };\n  }\n\n  const InputConnection = connect(mapStateToInput, null)(InputDisplay);\n  const OutputConnection = connect(mapStateToOutput, null)(OutputDisplay);\n  const DisplayConnection = connect(mapStateToProps, null)(Display);\n  const ButtonConnection = connect(null, mapDispatchToProps)(Button);\n\n  class Left extends React.Component {\n    constructor(props) {\n      super(props);\n    }\n\n    render() {\n      const BUTTONS = [{\n        id: 'clear',\n        element: 'AC',\n        class: 'btn-danger',\n        handler: function () {\n          this.props.clearAll();\n        }\n      }, {\n        id: 'ce',\n        element: 'CE',\n        class: 'btn-danger',\n        handler: function () {\n          this.props.clear();\n        }\n      }, {\n        id: 'open-paren',\n        element: '('\n      }, {\n        id: 'close-paren',\n        element: ')'\n      }, {\n        id: 'add',\n        element: '+'\n      }, {\n        id: 'subtract',\n        element: '-'\n      }, {\n        id: 'multiply',\n        element: '*'\n      }, {\n        id: 'divide',\n        element: '/'\n      }, {\n        id: 'decimal',\n        element: '.'\n      }, {\n        id: 'zero',\n        element: 0\n      }, {\n        id: 'one',\n        element: 1\n      }, {\n        id: 'two',\n        element: 2\n      }, {\n        id: 'three',\n        element: 3\n      }, {\n        id: 'four',\n        element: 4\n      }, {\n        id: 'five',\n        element: 5\n      }, {\n        id: 'six',\n        element: 6\n      }, {\n        id: 'seven',\n        element: 7\n      }, {\n        id: 'eight',\n        element: 8\n      }, {\n        id: 'nine',\n        element: 9\n      }];\n      return React.createElement(\"div\", {\n        id: \"left\"\n      }, BUTTONS.map(e => {\n        return React.createElement(ButtonConnection, {\n          id: e.id,\n          element: e.element,\n          html: e.element,\n          class: e.class ? ' ' + e.class : '',\n          handler: e.handler ? e.handler : null\n        });\n      }));\n    }\n\n  }\n\n  class Middle extends React.Component {\n    constructor(props) {\n      super(props);\n    }\n\n    render() {\n      const BUTTONS = [{\n        id: 'square',\n        element: '^(2)',\n        html: 'x<sup>2</sup>'\n      }, {\n        id: 'sqrt',\n        element: 'sqrt(',\n        html: '<sup>2</sup>√x'\n      }, {\n        id: 'inverse',\n        element: '^(-1)',\n        html: 'x<sup>-1</sup>'\n      }, {\n        id: 'equals',\n        element: '=',\n        html: '=',\n        handler: function () {\n          this.props.equals();\n        }\n      }];\n      return React.createElement(\"div\", {\n        id: \"middle\"\n      }, BUTTONS.map(e => {\n        return React.createElement(ButtonConnection, {\n          id: e.id,\n          element: e.element,\n          html: e.html,\n          class: e.class ? e.class : '',\n          handler: e.handler ? e.handler : null\n        });\n      }));\n    }\n\n  }\n\n  class Right extends React.Component {\n    constructor(props) {\n      super(props);\n    }\n\n    render() {\n      const BUTTONS = [{\n        id: 'power',\n        element: '^',\n        html: 'x<sup>n</sup>'\n      }, {\n        id: 'root',\n        element: '√',\n        html: '<sup>n</sup>√x'\n      }, {\n        id: 'mod',\n        element: '%',\n        html: '%'\n      }, {\n        id: 'ln',\n        element: 'ln(',\n        html: 'ln(x)'\n      }, {\n        id: 'log',\n        element: 'log(',\n        html: 'log(x)',\n        class: 'trig'\n      }, {\n        id: 'sin',\n        element: 'sin(',\n        html: 'sin(x)',\n        class: 'trig'\n      }, {\n        id: 'cos',\n        element: 'cos(',\n        html: 'cos(x)',\n        class: 'trig'\n      }, {\n        id: 'tan',\n        element: 'tan(',\n        html: 'tan(x)',\n        class: 'trig'\n      }, {\n        id: 'arcsin',\n        element: 'arcsin(',\n        html: 'sin<sup>-1</sup>(x)',\n        class: 'arctrig'\n      }, {\n        id: 'arccos',\n        element: 'arccos(',\n        html: 'cos<sup>-1</sup>(x)',\n        class: 'arctrig'\n      }, {\n        id: 'arctan',\n        element: 'arctan(',\n        html: 'tan<sup>-1</sup>(x)',\n        class: 'arctrig'\n      }, {\n        id: 'pi',\n        element: 'π',\n        html: 'π'\n      }, {\n        id: 'e',\n        element: 'e',\n        html: 'e'\n      }, {\n        id: 'deg',\n        element: '°',\n        html: '°'\n      }, {\n        id: 'factorial',\n        element: '!',\n        html: '!'\n      }];\n      return React.createElement(\"div\", {\n        id: \"right\"\n      }, BUTTONS.map(e => {\n        return React.createElement(ButtonConnection, {\n          id: e.id,\n          element: e.element,\n          html: e.html,\n          class: e.class ? ' ' + e.class : ''\n        });\n      }));\n    }\n\n  }\n\n  class ButtonWrapper extends React.Component {\n    render() {\n      return React.createElement(\"div\", {\n        id: \"button-wrapper\"\n      }, React.createElement(Left, null), React.createElement(Middle, null), React.createElement(Right, null));\n    }\n\n  }\n\n  class Calculator extends React.Component {\n    constructor(props) {\n      super(props);\n      this.handler = this.handler.bind(this);\n    }\n\n    componentDidMount() {\n      document.addEventListener('keydown', this.handler);\n    }\n\n    componentWillUnmont() {\n      document.removeEventListener('keydown');\n    }\n\n    handler(e) {\n      switch (e.keyCode) {\n        case 8:\n          this.props.clear();\n          break;\n\n        case 27:\n          this.props.clearAll();\n          break;\n\n        case 13:\n          this.props.equals();\n          break;\n      }\n\n      if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 96 && e.keyCode <= 107 || ['+', '-', '*', '^', '%', '!', '.', '(', ')'].indexOf(e.key) != -1) this.props.addToInput(e.key);\n      if (e.key == '=') this.props.equals();\n    }\n\n    render() {\n      return React.createElement(\"div\", {\n        id: \"calculator\"\n      }, React.createElement(\"h1\", {\n        id: \"header\"\n      }, \"Electronic Calculator\"), React.createElement(\"div\", {\n        id: \"display\",\n        class: \"text-right\"\n      }, React.createElement(OutputConnection, null), React.createElement(InputConnection, null)), React.createElement(ButtonWrapper, null));\n    }\n\n  }\n\n  const CalculatorConnection = connect(null, mapDispatchToProps)(Calculator);\n\n  class Wrapper extends React.Component {\n    render() {\n      return React.createElement(Provider, {\n        store: store\n      }, React.createElement(CalculatorConnection, null));\n    }\n\n  }\n\n  ReactDOM.render(React.createElement(Wrapper, null), $('#calc-target')[0]);\n});\n\n//# sourceURL=webpack:///./public/project-files/front-end/calculator/calc.jsx?");

/***/ })

/******/ });