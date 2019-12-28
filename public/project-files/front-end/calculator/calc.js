!function(e){var t={};function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(r,l,function(t){return e[t]}.bind(null,l));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){$(document).ready((function(){const e="((?:[0-9]*.?[0-9]+)|(?:[0-9]+.?[0-9]*))",t="OUTPUT",n="INPUT",r="PARSE",l="CLEAR",s="CLEAR_ALL",i={input:"0",expression:"",output:""};function c(e){return{type:n,input:e}}function a(e){return{type:r,input:e}}function u(e){return{type:t,expression:e}}function o(e=!1){return function(t){t(e?{type:s}:{type:l}),t(a("")),t(u(""))}}const p=Redux.combineReducers({input:function(t=i.input,r){switch(r.type){case n:const i=["0","1","2","3","4","5","6","7","8","9"],c=["+","-","*","/"],a=new RegExp(e+"$");if("0"==t)return-1==c.indexOf(c)?String(r.input):t+String(r.input);if(a.test(t)){const e=t.match(a);return"0"==e[0]?"0"==r.input?t:-1!=i.indexOf(r.input)?t.substring(0,t.length-1)+String(r.input):t+String(r.input):"."==r.input&&-1!=e[0].indexOf(".")?t:t+String(r.input)}return-1!=c.indexOf(t[t.length-1])&&-1!=c.indexOf(r.input)?"-"==r.input?-1!=c.indexOf(t[t.length-2])?t.substring(0,t.length-2)+r.input:t+r.input:-1!=c.indexOf(t[t.length-2])?t.substring(0,t.length-2)+r.input:t.substring(0,t.length-1)+r.input:t+String(r.input);case l:const u=/((log\()|(ln\()|(pi)|(sqrt\()|((arc)?(sin|cos|tan)\())$/;return u.test(t)?t.replace(u,""):t.substring(0,t.length-1);case s:return"0";default:return t}},expression:function(t=i.expression,n){switch(n.type){case r:const l="("+e+"|e|pi)",s=new RegExp(l+"°","g"),i=new RegExp(l+"√"+l,"g"),c=new RegExp(l+"√\\("+l+"\\)","g"),a=new RegExp("log\\("+l+"\\)","g"),u=/(?:arc(sin|cos|tan))/;return n.input.replace(s,"*(pi/180)").replace(i,(e,t,n)=>`nthRoot(${n},${t})`).replace(a,(e,t)=>`log(${t})/log(10)`).replace(u,(e,t)=>`a${t}`).replace(c,(e,t,n)=>`nthRoot(${n},${t})`).replace("π","pi").replace("ln","log");default:return t}},output:function(e=i.output,n){switch(n.type){case t:try{return""==n.expression?"":`${math.evaluate(n.expression)}`}catch{return"undefined"}default:return e}}}),d=Redux.createStore(p,i,Redux.applyMiddleware(ReduxThunk.default));class m extends React.Component{constructor(e){super(e)}render(){return React.createElement("div",{id:"output",class:"text-right"},this.props.output)}}class h extends React.Component{constructor(e){super(e)}render(){return React.createElement("div",{id:"input",class:"text-right"},this.props.input)}}class f extends React.Component{constructor(e){super(e)}render(){return React.createElement("div",{id:"display",class:"text-right"},""==this.props.output?this.props.input:this.props.output)}}class x extends React.Component{constructor(e){super(e),this.handler=this.handler.bind(this),this.props.handler&&(this.props.handler=this.props.handler.bind(this))}handler(){this.props.addToInput(this.props.element)}render(){return React.createElement("button",{id:this.props.id,class:`btn${this.props.class}`,onClick:this.props.handler?this.props.handler:this.handler,dangerouslySetInnerHTML:{__html:`<div>${this.props.html}</div>`},style:this.props.class?{}:{border:"1px solid lightgrey"}})}}const g=ReactRedux.Provider,R=ReactRedux.connect;function y(e){return{addToInput:t=>e(function(e){return function(t,n){if(-1!=["+","-","*","/"].indexOf(e)){t(a(n().input));try{math.evaluate(n().expression)}catch{}n().output;t(c(e))}else t(c(e))}}(t)),clear:()=>e(o(!1)),clearAll:()=>e(o(!0)),equals:()=>e((function(e,t){e(a(t().input)),e(u(t().expression))}))}}const E=R((function(e){return{input:e.input}}),null)(h),b=R((function(e){return{output:e.output}}),null)(m),v=(R((function(e){return{input:e.input,output:e.output}}),null)(f),R(null,y)(x));class C extends React.Component{constructor(e){super(e)}render(){return React.createElement("div",{id:"left"},[{id:"clear",element:"AC",class:"btn-danger",handler:function(){this.props.clearAll()}},{id:"ce",element:"CE",class:"btn-danger",handler:function(){this.props.clear()}},{id:"open-paren",element:"("},{id:"close-paren",element:")"},{id:"add",element:"+"},{id:"subtract",element:"-"},{id:"multiply",element:"*"},{id:"divide",element:"/"},{id:"decimal",element:"."},{id:"zero",element:0},{id:"one",element:1},{id:"two",element:2},{id:"three",element:3},{id:"four",element:4},{id:"five",element:5},{id:"six",element:6},{id:"seven",element:7},{id:"eight",element:8},{id:"nine",element:9}].map(e=>React.createElement(v,{id:e.id,element:e.element,html:e.element,class:e.class?" "+e.class:"",handler:e.handler?e.handler:null})))}}class O extends React.Component{constructor(e){super(e)}render(){return React.createElement("div",{id:"middle"},[{id:"square",element:"^(2)",html:"x<sup>2</sup>"},{id:"sqrt",element:"sqrt(",html:"<sup>2</sup>√x"},{id:"inverse",element:"^(-1)",html:"x<sup>-1</sup>"},{id:"equals",element:"=",html:"=",handler:function(){this.props.equals()}}].map(e=>React.createElement(v,{id:e.id,element:e.element,html:e.html,class:e.class?e.class:"",handler:e.handler?e.handler:null})))}}class k extends React.Component{constructor(e){super(e)}render(){return React.createElement("div",{id:"right"},[{id:"power",element:"^",html:"x<sup>n</sup>"},{id:"root",element:"√",html:"<sup>n</sup>√x"},{id:"mod",element:"%",html:"%"},{id:"ln",element:"ln(",html:"ln(x)"},{id:"log",element:"log(",html:"log(x)",class:"trig"},{id:"sin",element:"sin(",html:"sin(x)",class:"trig"},{id:"cos",element:"cos(",html:"cos(x)",class:"trig"},{id:"tan",element:"tan(",html:"tan(x)",class:"trig"},{id:"arcsin",element:"arcsin(",html:"sin<sup>-1</sup>(x)",class:"arctrig"},{id:"arccos",element:"arccos(",html:"cos<sup>-1</sup>(x)",class:"arctrig"},{id:"arctan",element:"arctan(",html:"tan<sup>-1</sup>(x)",class:"arctrig"},{id:"pi",element:"π",html:"π"},{id:"e",element:"e",html:"e"},{id:"deg",element:"°",html:"°"},{id:"factorial",element:"!",html:"!"}].map(e=>React.createElement(v,{id:e.id,element:e.element,html:e.html,class:e.class?" "+e.class:""})))}}class w extends React.Component{render(){return React.createElement("div",{id:"button-wrapper"},React.createElement(C,null),React.createElement(O,null),React.createElement(k,null))}}class S extends React.Component{constructor(e){super(e),this.handler=this.handler.bind(this)}componentDidMount(){document.addEventListener("keydown",this.handler)}componentWillUnmont(){document.removeEventListener("keydown")}handler(e){switch(e.keyCode){case 8:this.props.clear();break;case 27:this.props.clearAll();break;case 13:this.props.equals()}(e.keyCode>=48&&e.keyCode<=57||e.keyCode>=65&&e.keyCode<=90||e.keyCode>=96&&e.keyCode<=107||-1!=["+","-","*","^","%","!",".","(",")"].indexOf(e.key))&&this.props.addToInput(e.key),"="==e.key&&this.props.equals()}render(){return React.createElement("div",{id:"calculator"},React.createElement("h1",{id:"header"},"Electronic Calculator"),React.createElement("div",{id:"display",class:"text-right"},React.createElement(b,null),React.createElement(E,null)),React.createElement(w,null))}}const T=R(null,y)(S);class q extends React.Component{render(){return React.createElement(g,{store:d},React.createElement(T,null))}}ReactDOM.render(React.createElement(q,null),$("#project-body")[0])}))}]);