import React,{Component} from 'react'; 
import Main from './components/MainComponent.js'; 
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
        <div>
           <Main />
      </div>
    );
  }
}

export default App;
