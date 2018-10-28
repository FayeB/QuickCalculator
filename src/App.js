import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent.js';
import KeypadComponent from './components/KeypadComponent.js';

var operatorFlagSet = false;
var resultFlagSet = true;

class App extends Component {
	   constructor(){
	        super();

	        this.state = {
	            result: ""
	        }
	    }

	    onClick = button => {
	    	// reset the calculation if = has previously been pressed
	    	if(resultFlagSet === true){
	    		resultFlagSet = false;
	    		this.reset()
	    	}

	        if(button === "="){
            	resultFlagSet = true;
	            this.calculate()
	        }

	        else if(button === "C"){
	            this.reset()
	        }
	        else if(button === "CE"){
	            this.backspace()
	        }
	        else
	        	if(button === '+' || 
	        			button === '-' ||
	        			button === '*' ||
	        			button === '/' ||
	        			button === '.')
	        	{	// check if this is an operator button press
	        		if (operatorFlagSet === false) //check if the previous button press was an operator
	        		{
	        			operatorFlagSet = true  // now its true
	        			this.setState({
	        				result: this.state.result + button
	        			})
	        		}
	        	}else
	        	{ //its not so concatonate the number
	        		operatorFlagSet = false;  // last button is not longer an operator
	        		this.setState({
	        			result: this.state.result + button
	        		})
	        	}
	    
	    };


	    calculate = () => {
	        try {
	            this.setState({
	                result: (eval(this.state.result) || "" ) + ""
	            })
	        } catch (e) {
	            this.setState({
	                result: "error"
	            })

	        }
	    };

	    reset = () => {
	        this.setState({
	            result: ""
	        })
	    };

	    backspace = () => {
	        this.setState({
	            result: this.state.result.slice(0, -1)
	        })
	    };
  render() {
    return (
      <div className="App">
        <div className="calculator-body">
            <h1>Calculator</h1>
            <ResultComponent result={this.state.result}/>
            <KeypadComponent onClick={this.onClick}/>
        </div>

      </div>

    );
  }
}

export default App;
