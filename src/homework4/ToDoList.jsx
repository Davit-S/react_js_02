import React, { Component } from 'react';
import styles from './stylesToDo.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Tasks from "./Tasks/Tasks";
import TaskInput from "../homework4/TaskInput/TaskInput";


class ToDoList extends Component {

    state = {
        editTaskTitle: '',
        editTaskDescription: '',
        tasks: [],
        checkboxTask: new Set()
    };

    ////////

    changeInputValue = (value, type) => {

        if (type === "title") {
            this.setState({
                editTaskTitle: value
            });

            return
        };

        if (type === "description") {
            this.setState({
                editTaskDescription: value
            });

            return
        };

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

        console.log(newCheckboxTask);   //սույն զանգվածի և ներքոգրյալ զանգվածի արժեքները տարբեր են, հասկանալ պատճառը?
        console.log(this.state.checkboxTask);

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

    remoweCheckboxTask = (event) => {

        let { tasks, checkboxTask } = this.state

        let newTasks = tasks.filter((elem) => {
            if (checkboxTask.has(elem._id)) {
                return false
            }
            else { return true }
        });

        this.setState({
            tasks: newTasks,
            checkboxTask: new Set()
        });

    };

    //////


    editClick = (taskId, buttonType) => {
        let { tasks } = this.state;
        let booleanOne;
        let booleanTwo;

        if (buttonType === "EDIT") {
            booleanOne = true;
            booleanTwo = false
        };

        if (buttonType === "CANCLE") {
            booleanOne = false;
            booleanTwo = true
        };

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i]._id === taskId) {
                tasks[i].hidden = booleanOne;
                tasks[i].editHidden = booleanTwo;
                this.setState({
                    tasks
                })  //ընդհանրապես ընդունված է if-ի ներսում setState կանչելը?

                return
            }
        }


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


    getNewObject = (obj) => {
        let tasks = [...this.state.tasks, obj];

        this.setState({
            tasks
        })

    }


    /////


    tasksCycle = () => {

        return this.state.tasks.map((element, index) => {
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
                    newTasks={element}
                    onChangeInputValue={this.changeInputValue}
                    onEditClick={this.editClick}
                    onSaveEditTask={this.saveEditTask}
                    onCheckboxTask={this.state.checkboxTask}
                    onRemowTask={this.remowTask}
                />

            </Col>

        })
    }

    //////////

    render() {

        return (
            <div>
                <h1 className={styles.toDoListTitle}>TODO LIST</h1>

                <TaskInput
                    onRemoweCheckboxTask={this.remoweCheckboxTask}
                    onCheckboxTask={this.state.checkboxTask}
                    onTransfer={this.getNewObject}
                />

                <Container>
                    <Row className={styles.cardsRow}>
                        {this.tasksCycle()}
                    </Row>
                </Container>
            </div >

        );

    }

}

export default ToDoList;