/*import React, {useState, useEffect} from 'react';
import logo from './logo.svg';*/
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListQuestionComponent from './components/ListQuestionComponent';
import CreateQuestionComponent from './components/CreateQuestionComponent';
import ReadQuestionComponent from './components/ReadQuestionComponent';
import ListAnswerComponent from './components/ListAnswerComponent';
import LoginAnswerUserComponent from './components/LoginAnswerUserComponent';
import SignupAnswerUserComponent from './components/SignupAnswerUserComponent';
import ReadAnswerComponent from './components/ReadAnswerComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Switch>
              <Route path = "/" exact component={ListQuestionComponent}></Route>
              <Route path = "/question" component={ListQuestionComponent}></Route>
              <Route path = "/create-question" component = {CreateQuestionComponent}></Route>
              <Route path = "/read-question/:idx" component = {ReadQuestionComponent}></Route>
              <Route path = "/login" component={LoginAnswerUserComponent}></Route>
              <Route path = "/signup" component={SignupAnswerUserComponent}></Route>
              <Route path = "/answer" component={ListAnswerComponent}></Route>
              <Route path = "/read-answer/:idx" component={ReadAnswerComponent}></Route>
           </Switch>
          </div>
        <FooterComponent/>
      </Router>
    </div>
  );
}

export default App;
