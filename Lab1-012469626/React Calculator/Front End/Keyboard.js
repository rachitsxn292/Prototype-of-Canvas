import React,{Component} from 'react';
import axios from 'axios';


class Keyboard extends Component{
    constructor(props){
        super(props);
        this.state={
            inp1:'',
            inp2:'',
            op:'',
            result: ''
        }
    }
        
    dataMount(event){
        
        var x = event.target.value;
        
        this.setState({
            op: x
        })
        console.log(this.state.inp1);
        console.log(this.state.inp2);
        console.log(this.state.op);
        axios.post('http://localhost:3001/calculator', {
            in1: this.state.inp1,
            in2: this.state.inp2,
            op: event.target.value
        })
        .then(response=>{
            console.log(response);
            this.setState({
                result:response.data
            })
        });
    }
    
  
    inputChange1(event){
        this.setState({
            inp1: event.target.value
        })
    }

    inputChange2(event){
        this.setState({
            inp2: event.target.value
        })
    }

   clearData(){
       this.setState({
           inp1:"",
           inp2:"",
           result:""
       })

   }

    render() {
       
        return(
            <div>
                <div className="inputAndOutput" >
                    <div className="inp1" id="inp1">
                        <input placeholder="Enter First Number"  value={this.state.inp1} onChange={this.inputChange1.bind(this)} type="number" />
                    </div> 
                    <div className="inp2" id="inp2">
                        <input placeholder="Enter Second Number" value={this.state.inp2} onChange={this.inputChange2.bind(this)} type="number"/>
                    </div>
                    <div className="out" id="out" >
                        <input placeholder="Output" type="text" readOnly value={this.state.result}/>
                    </div>
                </div>
                    <div className="operations">
                        <div className="addition">
                        <button name="add" id="add" value="Add" onClick={this.dataMount.bind(this)}>+ Add</button>
                        </div>
                        <div className="substraction">
                        <button name="sub" id="sub" value="Sub" onClick={this.dataMount.bind(this)}>- Substract</button>
                        </div>
                        <div className="divison">
                        <button name="div" id="div" value="Div" onClick={this.dataMount.bind(this)}>/ Divide</button>
                        </div>
                        <div className="multiplication">
                        <button name="mul" id="mul" value="Mul" onClick={this.dataMount.bind(this)}>* Multiply</button>
                        </div>
                        <div className="clear">
                        <button name="clear" id="clear" type="reset" onClick={this.clearData.bind(this)} >Clear</button>
                        </div>
                        
                    </div>
                </div>

        
            
            
        )
    }
}


export default Keyboard;