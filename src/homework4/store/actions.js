import request from '../helpers/request';
import * as actionTypes from './actionTypes';
import {history} from '../helpers/history'

export function getTasks() {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });

        request('http://localhost:3001/task')
            .then((tasks) => {
                dispatch({ type: actionTypes.GET_TASKS, tasks: tasks })
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function getTask(taskId) {

    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });

        request(`http://localhost:3001/task/${taskId}`)
            .then((task) => {
                dispatch({ type: actionTypes.GET_TASK, task});
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}


export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });

        request('http://localhost:3001/task', 'POST', newTask)
            .then((task) => {
                dispatch({ type: actionTypes.ADD_TASK, task });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
};

export function deleteTask(taskId, from) {
    return function (dispatch) {
        dispatch({type: actionTypes.PENDING});

        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: actionTypes.DELETE_TASK, taskId });
                if (from === 'single') {
                    console.log(history);
                    history.push('/')
                }
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function deleteTasks(taskIds) {
    return function (dispatch) {
        dispatch({type: actionTypes.PENDING});

        request(`http://localhost:3001/task`, 'PATCH', {
            tasks: [...taskIds]
        })
            .then(() => {
                dispatch({ type: actionTypes.DELETE_TASKS, taskIds });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function editTask(data, from) {
    return function (dispatch) {
        dispatch({type: actionTypes.PENDING});

        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: actionTypes.EDIT_TASK, editedTask, from });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function contactUse(data) {
    return function (dispatch) {
        dispatch({type: actionTypes.PENDING});

        request('http://localhost:3001/form', 'POST', data)
            .then((editedTask) => {
                dispatch({ type: actionTypes.CONTACTUSE, editedTask });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}