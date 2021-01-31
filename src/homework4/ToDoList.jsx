import React, { PureComponent } from 'react';
import styles from './stylesToDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Tasks from "./Tasks/Tasks";
import TaskInput from "../homework4/TaskInput/TaskInput";
import Confirm from './Confirm';
import EditTask from './Tasks/EditTask';


class ToDoList extends PureComponent {

    state = {
        showDeleteTasks: false,
        showAddNewTask: false,
        tasks: [],
        checkboxTask: new Set(),
        showEditTask: false,
        editTaskObject: null
    };


    ////////

    pushCheckboxTasks = (taskId) => {

        let newCheckboxTask = new Set(this.state.checkboxTask);

        if (newCheckboxTask.has(taskId)) {
            newCheckboxTask.delete(taskId)
        }
        else {
            newCheckboxTask.add(taskId)
        }

        this.setState({
            checkboxTask: newCheckboxTask
        });

    };

    ////////

    remowTask = (taskId) => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async (resualt) => {
            const res = await resualt.json();

            if (resualt.status>=400 && resualt.status<=600) {
                if (res.error) {
                    throw res.error
                }
                else{
                    throw new Error('Something went wrong!')
                }                
            }
            
            let filterTask = this.state.tasks.filter((element) => {
                if (element._id === taskId) {
                    return false
                }
                else { return true }
            })
    
            this.setState({
                tasks: filterTask
            });
                
        }).catch((error)=>{
            console.log(error);
        })    

    }

    ////////

    closeTask = () => {
        this.setState({
            editTaskObject: null
        });
    }

    ////////

    remoweCheckboxTask = () => {

        let taskArray = this.state.tasks;
        let { checkboxTask } = this.state;

        let newArray = Array.from(checkboxTask)
        
        fetch('http://localhost:3001/task', {
            method: 'PATCH',
            body: JSON.stringify({tasks: newArray}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async (resualt) => {

            const res = await resualt.json();

            if (resualt.status>=400 && resualt.status<=600) {
                if (res.error) {
                    throw res.error
                }
                else{
                    throw new Error('Something went wrong!')
                }                
            }
            
        let newTasks = taskArray.filter((elem) => {
            if (checkboxTask.has(elem._id)) {
                return false
            }
            else { return true }
        });

        this.setState({
            tasks: newTasks,
            checkboxTask: new Set(),
            showDeleteTasks: false
        });

        }).catch((error)=>{
            console.log(error);
        })


    };

    //////


    editClick = (taskObject) => {

        this.setState({
            editTaskObject: taskObject
        });

    }

    //////

    closeConfirm = () => {
        this.setState({
            showDeleteTasks: !this.state.showDeleteTasks
        });
    }

    //////

    openAddTask = () => {
        this.setState({
            showAddNewTask: !this.state.showAddNewTask
        });
    }


    /////


    componentDidMount(){

        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async (resualt) => {

            const res = await resualt.json();

            if (resualt.status>=400 && resualt.status<=600) {
                if (res.error) {
                    throw res.error
                }
                else{
                    throw new Error('Something went wrong!')
                }                
            }
            
            this.setState({
                tasks: res,
            });
            
        }).catch((error)=>{
            console.log(error);
        })

    }


    /////


    getNewObject = (obj) => {

        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async (resualt) => {

            const task = await resualt.json()

            if (resualt.status>=400 && resualt.status<=600) {
                if (task.error) {
                    throw task.error
                }
                else{
                    throw new Error('Something went wrong!')
                }                
            }
            
            let tasks = [...this.state.tasks, task];

            this.setState({
                tasks,
                showAddNewTask: false
            });
            
        }).catch((error)=>{
            console.log(error);
        })
    }


    ////

    selectAllTasks = () => {

        let newTaskArray = this.state.tasks.map((element) => {
            return element._id
        });

        this.setState({
            checkboxTask: new Set(newTaskArray)
        });

    }


    /////

    deSelectAllTasks = () => {
        this.setState({
            checkboxTask: new Set()
        });
    }


    /////

    editTaskTransfer = (editedTask) => {

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedTask),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async (resualt) => {

            const task = await resualt.json()

            if (resualt.status>=400 && resualt.status<=600) {
                if (task.error) {
                    throw task.error
                }
                else{
                    throw new Error('Something went wrong!')
                }                
            }
            
            let tasks = [...this.state.tasks];
            let foundIndex = tasks.findIndex((task) => task._id === editedTask._id);
            tasks[foundIndex] = editedTask;
    
            this.setState({
                tasks,
                editTaskObject: null
            });
    
            
        }).catch((error)=>{
            console.log(error);
        })

    }

    /////


    tasksCycle = () => {

        let { checkboxTask } = this.state;

        return this.state.tasks.map((element) => {
            return <Col className={styles.colCard}
                key={element._id}
                xs={12}
                sm={6}
                md={5}
                lg={4}
                xl={3}
            >

                <Tasks
                    onPushCheckboxTasks={this.pushCheckboxTasks}
                    element={element}
                    onEditClick={this.editClick}
                    onCheckboxTask={checkboxTask}
                    onRemowTask={this.remowTask}
                    selectedCheckbox={checkboxTask.has(element._id)}
                />

            </Col>

        })
    }

    //////////

    render() {

        let { checkboxTask, tasks, editTaskObject } = this.state;

        return (
            <div>
                <h1 className={styles.toDoListTitle}>TODO LIST</h1>
                <Container>

                    <Row className={styles.buttonsRow}>
                        <Col>
                            <Button
                                onClick={this.openAddTask}>
                                ADD TASK
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                onClick={this.selectAllTasks}
                                disabled={!tasks.length}
                                variant='warning'>
                                SELECT ALL
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                onClick={this.deSelectAllTasks}
                                disabled={!checkboxTask.size}
                                variant='warning'>
                                DESELECT ALL
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                className={styles.remoweTaskButton}
                                onClick={this.closeConfirm}
                                disabled={!checkboxTask.size}
                                variant='danger'
                            >
                                REMOWE TASKS
                        </Button>

                        </Col>

                    </Row>

                    <Row className={styles.cardsRow}>
                        {this.tasksCycle()}
                    </Row>

                </Container>



                {this.state.showAddNewTask &&
                    <TaskInput
                        onClose={this.openAddTask}
                        onTransfer={this.getNewObject}
                    />}

                {this.state.showDeleteTasks &&
                    <Confirm
                        onCloseConfirm={this.closeConfirm}
                        onConfirmDelete={this.remoweCheckboxTask}
                        sizeSet={checkboxTask.size}
                    />
                }

                {this.state.editTaskObject &&
                    <EditTask
                        onCloseTask={this.closeTask}
                        onEditTaskTransfer={this.editTaskTransfer}
                        task={editTaskObject}
                    />}
            </div >

        );

    }

}

export default ToDoList;