import React,{Component} from 'react'; 
import Main from './components/MainComponent.js'; 
import {BrowserRouter} from 'react-router-dom';
import './App.css';

class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
    };
    //console.log(this.state.dishes);
  }
  render(){
    return (
        <BrowserRouter>
        <div>
           <Main />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
