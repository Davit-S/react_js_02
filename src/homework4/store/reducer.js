import * as actionTypes from './actionTypes';

const defaultState = {
    tasks: [],
    task: null,
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTasksSuccess: false,
    editTaskSuccess: false,
    loading: false,
    notificationSuccess: null,
    notificationError: null
};

export default function reducer(state = defaultState, action) {

    switch (action.type) {
        case actionTypes.PENDING: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                deleteTasksSuccess: false,
                editTasksSuccess: false,
                notificationSuccess: null,
                notificationError: null
            };
        }
        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                notificationError: action.error
            };
        }
        case actionTypes.GET_TASKS: {
            return {
                ...state,
                loading: false,
                tasks: action.tasks
            };
        }
        case actionTypes.GET_TASK: {
            return {
                ...state,
                task: action.task,
                loading: false
            };
        }
        case actionTypes.ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                loading: false,
                addTaskSuccess: true,
                notificationSuccess: "Task created successfully!!!"
            };
        }

        case actionTypes.DELETE_TASK: {

            if(action.from === 'single'){
                return {
                  ...state,
                  task: null,
                  loading: false,
                  notificationSuccess: 'Task deleted successfully!!!'
                };
      
              }
            
            const newTasks = state.tasks.filter((task) => action.taskId !== task._id);
            return {
                ...state,
                loading: false,
                tasks: newTasks,
                notificationSuccess: "Task deleted successfully!!!"
            };
        }

        case actionTypes.DELETE_TASKS: {

            const newTasks = state.tasks.filter((task) => {
                if (action.taskIds.has(task._id)) {
                    return false;
                }
                return true;
            });

            return {
                ...state,
                tasks: newTasks,
                loading: false,
                deleteTasksSuccess: true,
                notificationSuccess: "Tasks deleted successfully!!!"
            };
        }

        case actionTypes.EDIT_TASK: {
            if(action.from === 'single'){
                return {
                  ...state,
                  task: action.editedTask,
                  editTaskSuccess: true,
                  loading: false,
                  notificationSuccess: 'Task edited successfully!!!'
                };
            }

            const tasks = [...state.tasks];
            const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
            tasks[foundIndex] = action.editedTask;

            return {
                ...state,
                tasks,
                loading: false,
                editTasksSuccess: true,
                notificationSuccess: "Task edited successfully!!!"
            };
        }

        case actionTypes.CONTACTUSE: {
            return {
                ...state,
                loading: false,
                notificationSuccess: 'Task edited successfully!!!'
            };
        }

        default: return state;
    }


}