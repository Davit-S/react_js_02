import React, { useEffect } from 'react';
import './App.css';
import ToDoList from './homework4/ToDoList';
import NavMenu from './homework4/NavMenu'
import About from './homework4/Pages/About'
import Contact from './homework4/Pages/Contact'
import SingleTask from './homework4/Pages/SingleTask'
import NotFound from './homework4/Pages/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Spinner from './homework4/Sppiner/Spinner';
// import Message from './homework4/Message/Message'
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {history} from './homework4/helpers/history'


function App({ loading, notificationSuccess, notificationError }) {

  useEffect(()=>{
    if(notificationSuccess){
      toast.success(notificationSuccess, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
    }

    if(notificationError){
      toast.error(notificationError, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
    }

  }, [notificationSuccess, notificationError]);


  return (
    <div className="App">

      <Router history={history}>
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
            path='/singleTask/:taskId'
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


      </Router>


      { loading && <Spinner />}
      <ToastContainer />

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    notificationSuccess: state.notificationSuccess,
    notificationError: state.notificationError
  };
};

export default connect(mapStateToProps)(App);


