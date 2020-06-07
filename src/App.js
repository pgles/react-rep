import React,{Component} from 'react'; 
import Main from './components/MainComponent.js'; 
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore.js';
import './App.css';

const store = ConfigureStore();

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
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
