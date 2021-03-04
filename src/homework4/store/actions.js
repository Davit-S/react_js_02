import request from '../helpers/request';
import * as actionTypes from './actionTypes';
import {history} from '../helpers/history';

const host = process.env.REACT_APP_API_HOST;

export function getTasks(params="") {

    console.log(`${host}/task?${params}`); //Այս link-ով մտնելիս բոլոր թասկերը արդեն ֆիլտրված ցույց է տալիս

    //request-ը չի աշխատում ընդհանրապես չի կանչում այս ֆունկցիան

    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });

        request(`${host}/task?${params}`)
            .then((tasks) => {
                dispatch({ type: actionTypes.GET_TASKS, tasks: tasks });
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

        request(`${host}/task/${taskId}`)
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

        request(`${host}/task`, 'POST', newTask)
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

        request(`${host}/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: actionTypes.DELETE_TASK, taskId });
                if (from === 'single') {
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

        request(`${host}/task`, 'PATCH', {
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

        request(`${host}/task/${data._id}`, 'PUT', data)
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

        request(`${host}/form`, 'POST', data)
            .then((editedTask) => {
                dispatch({ type: actionTypes.CONTACTUSE, editedTask });
            })
            .catch(() => {
            });
    }
}