import React, { Component, Fragment } from 'react';
import stayls from './staylToDo.module.css';
import { Container, Row, Col, Button, InputGroup, Card, ListGroup, ListGroupItem} from 'react-bootstrap';

class ToDoList extends Component {

    state = {
        newTaskTitle: '',
        newTaskDescription: '',
        newTaskDate: '',
        newTaskCreated: '',
        newTaskStatus: '',
        tasks: [
            { title: 'Title', description: 'Description', date: 'Date', created: 'CreaTed', status: 'Status' }
        ],
        checkboxTask: []
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


        if (inputClassName === stayls.inputTaskDescription) {
            this.setState({
                newTaskDescription: event.target.value
            });
            return
        };

        if (inputClassName === stayls.inputTaskDate) {
            this.setState({
                newTaskDate: event.target.value
            });
            return
        };

        if (inputClassName === stayls.inputTaskCreated) {
            this.setState({
                newTaskCreated: event.target.value
            });
            return
        };

        if (inputClassName === stayls.newTaskStatus) {
            this.setState({
                newTaskStatus: event.target.value
            });
            return
        };

    };

    ////////

    pushCheckboxTasks = (event) => {

        let checkboxElement = event.target.closest('div');
        let arrayCheckboxElements = this.state.checkboxTask;

        if (arrayCheckboxElements.includes(checkboxElement)) {
            arrayCheckboxElements.splice(checkboxElement, 0);
        }
        else {
            arrayCheckboxElements.push(checkboxElement);
        };


        this.setState({
            checkboxTask: arrayCheckboxElements
        });

    };

    //////

    newTaskPush = () => {

        if (this.state.newTaskTitle && this.state.newTaskDescription && this.state.newTaskCreated && this.state.newTaskStatus) {
            let tasks = [...this.state.tasks];

            let newObject = {
                title: this.state.newTaskTitle,
                description: this.state.newTaskDescription,
                date: this.state.newTaskDate,
                created: this.state.newTaskCreated,
                status: this.state.newTaskStatus
            };

            tasks.push(newObject);

            this.setState({
                tasks,
                newTaskTitle: '',
                newTaskDescription: '',
                newTaskDate: '',
                newTaskCreated: '',
                newTaskStatus: ''
            });

        }

        else{
            alert("Please fill in all the boxes");
        }

    };

    ////////

    remowTask = (event) => {
        let element = event.target.closest('div');

        element.remove();
    }

    ////////

    remoweCheckboxTask = (event) => {
        this.state.checkboxTask.forEach((elem, index) => {
            elem.remove();
        });

        this.setState({
            checkboxTask: []
        });

    };

    //////


    tasksCycle = () => {

        let dateYear = new Date();

        return this.state.tasks.map((el, index) => {
            return <Card className={stayls.taskCard} style={{ width: '18rem' }} key={index}>
                <input type='checkbox' onClick={this.pushCheckboxTasks} />
                <Card.Body>
                    <Card.Title>{el.title}</Card.Title>
                    <Card.Text>
                        {el.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem> {dateYear.getDate()} {dateYear.getMonth() + '1'} {dateYear.getFullYear()} </ListGroupItem>
                    <ListGroupItem>{el.created}</ListGroupItem>
                    <ListGroupItem>{el.status}</ListGroupItem>
                </ListGroup>
                <Button className={stayls.taskButton} variant="outline-success">FINISH</Button>{' '}
                <Button className={stayls.taskButton} variant="outline-warning">EDIT</Button>{' '}
                <Button className={stayls.taskButton} variant="outline-danger" onClick={this.remowTask}>REMOW</Button>{' '}
            </Card>
        })
    }

    //////////

    render() {
        let { tasks } = this.state;

        return (<div>
            <h1 className={stayls.toDoListTitle}>TODO LIST</h1>
            <div className={stayls.tasksInputAndButton}>

                <input
                    className={stayls.inputTaskTitle}
                    type="text"
                    value={this.state.newTaskTitle}
                    onChange={this.changeInputValue}
                />
                <input
                    className={stayls.inputTaskDescription}
                    type="text"
                    value={this.state.newTaskDescription}
                    onChange={this.changeInputValue}
                />
                <input
                    className={stayls.inputTaskCreated}
                    type="text"
                    value={this.state.newTaskCreated}
                    onChange={this.changeInputValue}
                />
                <input
                    className={stayls.newTaskStatus}
                    type="text"
                    value={this.state.newTaskStatus}
                    onChange={this.changeInputValue}
                />
                <InputGroup.Append className={stayls.addAndRemowButtons}>
                    <Button className={stayls.addTaskButton} onClick={this.newTaskPush}>ADD TASK</Button>
                    <Button className={stayls.remoweAllTasks} onClick={this.remoweCheckboxTask}>REMOWE TASKS</Button>
                </InputGroup.Append>

            </div >
            <Container>
                <Row className={stayls.cardsRow}>
                    <Col>{this.tasksCycle()} </Col>
                </Row>
            </Container>
        </div >

        );

    }

}

export default ToDoList;






