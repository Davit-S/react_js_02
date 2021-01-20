import React, { Component } from 'react';
import styles from './stylesToDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Tasks from "./Tasks/Tasks";
import TaskInput from "../homework4/TaskInput/TaskInput";
import Confirm from './Confirm';
import EditTask from './Tasks/EditTask';


class ToDoList extends Component {

    state = {
        showDeleteTasks: false,
        showAddNewTask: false,
        tasks: [],
        checkboxTask: new Set(),
        showEditTask: false,
        editTaskObject: {}
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
        let filterTask = this.state.tasks.filter((element) => {
            if (element._id === taskId) {
                return false
            }
            else { return true }
        })

        this.setState({
            tasks: filterTask
        })
    }

    ////////

    remoweCheckboxTask = () => {

        let { tasks, checkboxTask } = this.state

        let newTasks = tasks.filter((elem) => {
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

    };

    //////


    editClick = (taskObject) => {

        this.setState({
            showEditTask: !this.state.showEditTask,
            editTaskObject: taskObject 
        });
           
    }

    saveEditTask = (taskId) => {

        if (this.state.editTaskTitle) {

            let { tasks } = this.state;

            tasks.forEach((elem) => {
                if (elem._id === taskId) {
                    elem.title = this.state.editTaskTitle
                    elem.description = this.state.editTaskDescription
                }
            })

            this.setState({
                tasks,
                editTaskTitle: '',
                editTaskDescription: ''
            });

            this.editClick(taskId, "CANCLE");

        }
        else { alert("Please fill in the box") }

    }

    //////

    closeConfirm = () => {
        this.setState({
            showDeleteTasks: !this.state.showDeleteTasks
        })
    }

    //////

    openAddTask = () => {
        this.setState({
            showAddNewTask: !this.state.showAddNewTask
        })
    }


    /////


    getNewObject = (obj) => {
        let tasks = [...this.state.tasks, obj];

        this.setState({
            tasks,
            showAddNewTask: false
        })

    }


    ////

    selectAllTasks = () => {

        let newTaskArray = this.state.tasks.map((element) => {
            return element._id
        });

        this.setState({
            checkboxTask: new Set(newTaskArray)
        })

    }


    /////

    deSelectAllTasks = () => {
        this.setState({
            checkboxTask: new Set()
        });
    }


    /////

    editTaskTransfer = (taskId, newTitle, newDescription) => {

        let {tasks} = this.state 

        tasks.forEach((element)=>{
            if(element._id === taskId){
                element.title = newTitle
                element.description = newDescription
                return
            }
        })

        this.setState({
            tasks,
            showEditTask: !this.state.showEditTask,
        })

    }

    /////


    tasksCycle = () => {

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
                    onCheckboxTask={this.state.checkboxTask}
                    onRemowTask={this.remowTask}
                    selectedCheckbox={this.state.checkboxTask.has(element._id)}
                />

            </Col>

        })
    }

    //////////

    render() {

        return (
            <div>
                <h1 className={styles.toDoListTitle}>TODO LIST</h1>
                <Container>

                    <Row>
                        <Col>
                            <Button
                                onClick={this.openAddTask}>
                                ADD TASK
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                onClick={this.closeConfirm}
                                disabled={!this.state.checkboxTask.size}>
                                REMOWE TASKS
                        </Button>

                        </Col>

                        <Col>
                            <Button
                                onClick={this.selectAllTasks}
                                disabled={!this.state.tasks.length}>
                                SELECT ALL
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                onClick={this.deSelectAllTasks}
                                disabled={!this.state.checkboxTask.size}>
                                DESELECT ALL
                            </Button>
                        </Col>


                    </Row>
                </Container>
                {this.state.showAddNewTask &&
                    <TaskInput
                        onClose={this.openAddTask}
                        onTransfer={this.getNewObject}
                    />}

                <Container>
                    <Row className={styles.cardsRow}>
                        {this.tasksCycle()}
                    </Row>
                </Container>

                {this.state.showDeleteTasks &&
                    <Confirm
                        onCloseConfirm={this.closeConfirm}
                        onConfirmDelete={this.remoweCheckboxTask}
                        sizeSet={this.state.checkboxTask.size}
                    />
                }

                {this.state.showEditTask && 
                <EditTask
                onToggleEditTask={this.editClick}
                onSaveEditTask={this.saveEditTask}
                onEditTaskTransfer={this.editTaskTransfer}
                objectTask={this.state.editTaskObject}               
                />}
            </div >

        );

    }

}

export default ToDoList;