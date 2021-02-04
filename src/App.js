import React from 'react';
import './App.css';
import ToDoList from './homework4/ToDoList';
import NavMenu from './homework4/NavMenu'
import About from './homework4/Pages/About'
import Contact from './homework4/Pages/Contact'
import SingleTask from './homework4/Pages/SingleTask'
import NotFound from './homework4/Pages/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavMenu />

        <Switch>
          <Route
            path='/'
            component={ToDoList}
            exact={true}
          />
          <Route
            path='/home'
            component={ToDoList}
            exact={true}
          />
          <Route
            path='/about'
            component={About}
            exact={true}
          />
          <Route
            path='/contact'
            component={Contact}
            exact
          />
          <Route
            path='/singleTask'
            component={SingleTask}
            exact
          />
          <Route
            path='/not-found'
            component={NotFound}
            exact
          />

          <Redirect to='/not-found' />
        </Switch>


      </BrowserRouter>





    </div>
  );
}

export default App;


