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

function Displaydememoria(props) {
  return (
    <div className="Displaydememoria">
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

function atualizamemoria(mem,pos){
  mem[pos]=""
  for ( var i = pos+1; i<8 ; i++){
    mem[i-1] = mem[i]}
  mem[7]=""  
  return mem
}

function adicionarmemoria(mem,carr){
  if (mem[7]==""){
    mem.unshift(carr)
    mem.pop()
  }
  return mem
}

function mmais(num,mem){
  let novonum = parseFloat(mem[0])+ parseFloat(num);
  mem[0]=String(novonum);
  return mem
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperand: "",
      previousOperand: "",
      operation:"",
      memoria:["","","","","","","",""],
    };
    this.addNumber = this.addNumber.bind(this);
    this.addOperator = this.addOperator.bind(this);
    this.addComma = this.addComma.bind(this);
    this.addEqual = this.addEqual.bind(this);
    this.LocalMemory = this.LocalMemory.bind(this);
    this.delNumber = this.delNumber.bind(this);
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

  delNumber(){
    if (this.state.currentOperand!=""){
       let novonum = this.state.currentOperand.slice(0, -1);
       this.setState(state=> {
          return{
          currentOperand: novonum,
            }
          })}
    else{
      return
    }
  }
  LocalMemory(func,pos){
    if(func=="MR"){
      this.setState(state=> {
        return {
          currentOperand: state.memoria[pos]
    }})}
    else if (func=="MC"){
      let memorianova= atualizamemoria(this.state.memoria,pos)
      this.setState(state=> {
        return {
          memoria: memorianova,
        }
      })
    }
  }
  TotalMemory(func){
    if(func=="MS" && this.state.currentOperand!=""){
      let carr = this.state.currentOperand;
      let memorianova=adicionarmemoria(this.state.memoria,carr);
      this.setState(state=> {
        return{
          memoria:memorianova,
        }
      })
    }
    else if(func=="MC"){
      this.setState(state=> {
        return{
          memoria:["","","","","","","",""],
        }
      })
    }
    else if(func=="MR"){
      this.setState(state=> {
        return{
          currentOperand:state.memoria[0],
        }
      })
    }
    else if(func=="MM" && this.state.currentOperand!= "" && this.state.memoria[0]!=""){
      let memorianova = mmais(this.state.currentOperand,this.state.memoria)
      this.setState(state=> {
        return{
          memoria:memorianova,
        }
      })
    }
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
                <Button id = "MCT" text="MC" aoClicar={() => this.TotalMemory("MC")} />
                <Button id = "MRT" text="MR" aoClicar={() => this.TotalMemory("MR")} />
                <Button id = "MMT" text="M+" aoClicar={() => this.TotalMemory("MM")} />
                <Button id = "MST" text="MS" aoClicar={() => this.TotalMemory("MS")} />
                <Button id = "DEL" text="DEL" aoClicar={() => this.delNumber()} />
            </div>
      </div>
      <div className="Memoria">
        <div className="escrita">
          Memória
        </div>
        <div className="Linhadememoria">
          <Displaydememoria  value={this.state.memoria[0]} />
          <div className="Botoesdememoria">
          <Button id = "MC" text="MC" aoClicar={() => this.LocalMemory("MC",0)} />
          <Button id = "MR" text="MR" aoClicar={() => this.LocalMemory("MR",0)} />
          </div>
        </div>
        <div className="Linhadememoria">
          <Displaydememoria  value={this.state.memoria[1]} />
          <div className="Botoesdememoria">
          <Button id = "MC" text="MC" aoClicar={() => this.LocalMemory("MC",1)} />
          <Button id = "MR" text="MR" aoClicar={() => this.LocalMemory("MR",1)} />
          </div>
        </div>
        <div className="Linhadememoria">
          <Displaydememoria  value={this.state.memoria[2]} />
          <div className="Botoesdememoria">
          <Button id = "MC" text="MC" aoClicar={() => this.LocalMemory("MC",2)} />
          <Button id = "MR" text="MR" aoClicar={() => this.LocalMemory("MR",2)} />
          </div>
        </div>
        <div className="Linhadememoria">
          <Displaydememoria  value={this.state.memoria[3]} />
          <div className="Botoesdememoria">
          <Button id = "MC" text="MC" aoClicar={() => this.LocalMemory("MC",3)} />
          <Button id = "MR" text="MR" aoClicar={() => this.LocalMemory("MR",3)} />
          </div>
        </div>
        <div className="Linhadememoria">
          <Displaydememoria  value={this.state.memoria[4]} />
          <div className="Botoesdememoria">
          <Button id = "MC" text="MC" aoClicar={() => this.LocalMemory("MC",4)} />
          <Button id = "MR" text="MR" aoClicar={() => this.LocalMemory("MR",4)} />
          </div>
        </div>
        <div className="Linhadememoria">
          <Displaydememoria  value={this.state.memoria[5]} />
          <div className="Botoesdememoria">
          <Button id = "MC" text="MC" aoClicar={() => this.LocalMemory("MC",5)} />
          <Button id = "MR" text="MR" aoClicar={() => this.LocalMemory("MR",5)} />
          </div>
        </div>
        <div className="Linhadememoria">
          <Displaydememoria  value={this.state.memoria[6]} />
          <div className="Botoesdememoria">
          <Button id = "MC" text="MC" aoClicar={() => this.LocalMemory("MC",6)} />
          <Button id = "MR" text="MR" aoClicar={() => this.LocalMemory("MR",6)} />
          </div>
        </div>
        <div className="Linhadememoria">
          <Displaydememoria  value={this.state.memoria[7]} />
          <div className="Botoesdememoria">
          <Button id = "MC" text="MC" aoClicar={() => this.LocalMemory("MC",7)} />
          <Button id = "MR" text="MR" aoClicar={() => this.LocalMemory("MR",7)} />
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;