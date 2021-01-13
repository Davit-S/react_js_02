import React, { Component, Fragment } from 'react';
import stayls from './staylToDo.module.css';
import { Container, Row, Col, Button, InputGroup, Card } from 'react-bootstrap';
import idGenerator from "./helpers/idGenerator"

class ToDoList extends Component {

    state = {
        newTaskTitle: '',
        editTaskTitle: '',
        hidden: false,
        editHidden: true,
        tasks: [],
        checkboxTask: new Set()
    };

    ////////

    changeInputValue = (event) => {

        let inputClassName = event.target.classList[0];

        if (inputClassName === stayls.inputTaskTitle) {
            this.setState({
                newTaskTitle: event.target.value
            });

            return
        };

        if (inputClassName === stayls.editinputTitle) {
            this.setState({
                editTaskTitle: event.target.value
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

    //////

    newTaskPush = () => {

        if (this.state.newTaskTitle) {
            let tasks = [...this.state.tasks];

            let newObject = {
                _id: idGenerator(),
                title: this.state.newTaskTitle,
                hidden: this.state.hidden,
                editHidden: this.state.editHidden
            };

            tasks.push(newObject);

            this.setState({
                tasks,
                newTaskTitle: '',
            });

        }

        else {
            alert("Please fill in the box");
        }

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
                }
            })

            this.setState({
                tasks,
                editTaskTitle: '',
            });

            this.editClick(taskId, "CANCLE");

        }
        else { alert("Please fill in the box") }

    }

    //////


    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.newTaskPush();
        }
    };


    /////


    tasksCycle = () => {

        let dateYear = new Date();

        return this.state.tasks.map((el, index) => {
            return <Col className={stayls.colCard}
                key={el._id}
                xs={12}
                sm={6}
                md={5}
                lg={4}
                xl={3}
            >
                <Card style={{ width: '18rem' }}>
                    <input type='checkbox' onChange={(event) => this.pushCheckboxTasks(el._id)} />

                    <Card.Body hidden={el.editHidden}>
                        <div>
                            <input
                                className={stayls.editinputTitle}
                                onChange={this.changeInputValue}
                                type="text"
                            />

                            <Button variant="secondary"
                                className={stayls.taskButton}
                                onClick={(event) => { this.editClick(el._id, "CANCLE") }}
                            > CANCLE </Button>
                            <Button variant="primary"
                                className={stayls.taskButton}
                                onClick={(event) => { this.saveEditTask(el._id) }}
                            > SAVE </Button>
                        </div>
                    </Card.Body>

                    <Card.Body hidden={el.hidden}>
                        <Card.Title>{el.title}</Card.Title>
                        <Card.Text>
                            {dateYear.getDate()} {dateYear.getMonth() + '1'} {dateYear.getFullYear()}
                        </Card.Text>
                        <Button variant="warning"
                            onClick={(event) => { this.editClick(el._id, "EDIT") }}
                            className={stayls.taskButton}
                        > EDIT </Button>
                        <Button variant="danger"
                            onClick={(event) => { this.remowTask(el._id) }}
                            disabled={!!this.state.checkboxTask.size}
                            className={stayls.taskButton}
                        > REMOW </Button>
                    </Card.Body>
                </Card>
            </Col>

        })
    }

    //////////

    render() {
        let { tasks } = this.state;

        return (
            <div>
                <h1 className={stayls.toDoListTitle}>TODO LIST</h1>
                <div className={stayls.tasksInputAndButton}>

                    <input
                        className={stayls.inputTaskTitle}
                        type="text"
                        value={this.state.newTaskTitle}
                        onChange={this.changeInputValue}
                        onKeyDown={this.handleKeyDown}
                    />

                    <InputGroup.Append className={stayls.addAndRemowButtons}>
                        <Button className={stayls.addTaskButton} onClick={this.newTaskPush}>ADD TASK</Button>
                        <Button className={stayls.remoweAllTasks}
                            onClick={this.remoweCheckboxTask}
                            disabled={!this.state.checkboxTask.size}>
                            REMOWE TASKS
                            </Button>
                    </InputGroup.Append>

                </div >
                <Container>
                    <Row className={stayls.cardsRow}>
                        {this.tasksCycle()}
                    </Row>
                </Container>
            </div >

        );

    }

}

export default ToDoList;
