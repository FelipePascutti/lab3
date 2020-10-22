import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props) {
  return (
    <div className="Display">
      {props.value}
    </div>
  );
}

function Button(props) {
  return (
    <button onClick={props.aoClicar} id= {props.id} >{props.text}</button>
  );
}

function opera(a,b,op){
  let resp;
  a = parseFloat(a.replace(",", "."));
  b = parseFloat(b.replace(",", "."));
  if (op=="+"){
    resp = a+b;
  }
  if (op=="-"){
    resp = a-b;
  }
  if (op=="*"){
    resp = a*b;
  }
  if (op=="/"){
    resp = a/b;
  }
  return String(resp).replace(".",",");
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: "",
      previousOperand: "",
      operation:"",
    };
    this.addNumber = this.addNumber.bind(this);
    this.addOperator = this.addOperator.bind(this);
    this.addComma = this.addComma.bind(this);
    this.addEqual = this.addEqual.bind(this);
  }

  addNumber(number) {
    this.setState(state => {
      return {        
        currentOperand: state.currentOperand + number,
      };
    });
  }
  addOperator(op) {
    if (this.state.operation == "" && this.state.currentOperand!=""){
      this.setState(state => {
       return {
          previousOperand: state.currentOperand,
          operation: op,
          currentOperand: "",}
      })}

    else if (this.state.currentOperand == "" && this.state.previousOperand!="") {
      this.setState(state => {
        return {
           operation: op,
       };
    })}
    else if (this.state.currentOperand == "" && this.state.previousOperand=="") {
      this.setState(state => {
        return {
           operation: "",
       };
    })}
    else {
      this.setState(state=> {
        return {
          previousOperand: opera(state.previousOperand, state.currentOperand, state.operation),
          currentOperand: "",
          operation:op,
      };
    });};  

  }
 
  addComma() {
    let temvirg = this.state.currentOperand.includes(",");
    if (temvirg){} 
    else {   
      this.setState(state => {
      return {
        currentOperand: state.currentOperand + ",",
      };
    })};
  }

  addEqual() {
    if(this.state.previousOperand!="" && this.state.operation!="" && this.state.currentOperand!=""){
    this.setState(state=> {
      return {
        previousOperand: "",
        currentOperand: opera(state.previousOperand, state.currentOperand, state.operation),
        operation:"",
  }})}}

  Clear(){
    this.setState(state=> {
      return {
        currentOperand: "", 
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="Conteudo">
             <Display value={this.state.previousOperand + this.state.operation} />
             <Display value={ this.state.currentOperand} />
          <div className="Botoes"> 
            <Button id = "zer" text="0" aoClicar={() => this.addNumber("0")} />
            <Button id = "um"  text="1" aoClicar={() => this.addNumber("1")} />
            <Button id = "doi" text="2" aoClicar={() => this.addNumber("2")} />
            <Button id = "tre" text="3" aoClicar={() => this.addNumber("3")} />
            <Button id = "qua" text="4" aoClicar={() => this.addNumber("4")} />
            <Button id = "cin" text="5" aoClicar={() => this.addNumber("5")} />
            <Button id = "sei" text="6" aoClicar={() => this.addNumber("6")} />
            <Button id = "set" text="7" aoClicar={() => this.addNumber("7")} />
            <Button id = "oit" text="8" aoClicar={() => this.addNumber("8")} />
            <Button id = "nov" text="9" aoClicar={() => this.addNumber("9")} />
            <Button id = "vir" text="," aoClicar={() => this.addComma()} />
            <Button id = "mai" text="+" aoClicar={() => this.addOperator("+")} />
            <Button id = "men" text="-" aoClicar={() => this.addOperator("-")} />
            <Button id = "mul" text="*" aoClicar={() => this.addOperator("*")} />
            <Button id = "div" text="/" aoClicar={() => this.addOperator("/")} />
            <Button id = "eq"  text="=" aoClicar={() => this.addEqual()} />
            <Button id = "AC"  text="AC" aoClicar={() => this.Clear()} />
           </div>
      </div>
    </div>
    );
  }
}

export default App;