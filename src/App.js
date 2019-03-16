import React, { Component } from 'react';
import './App.css';
import './semantic/semantic.css';
import './semantic/semantic';
import Navbar from './components/navbar/navbar';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './scenes/landing/landing-page';
import AppMain from './scenes/app/index';
import {Provider} from 'react-redux';
import store from './services/store/store';
import Footer from './components/footer/footer';
import 'animate.css/animate.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path="/unicornattractor" component={AppMain}/>
      </Switch>
      </div>
      <Footer/>
      </Provider>
    );
  }
}

export default App;
