import React, { Component } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import style from "./TaskInputStyle.module.css";
import idGenerator from "../helpers/idGenerator";
import PropTypes from 'prop-types'; 



export default class TaskInput extends Component {

    state = {
        taskTitle: "",
        taskDescription: "",
        hidden: false,
        editHidden: true
    }


    changeInputValue = (event) => {

        let inputClassName = event.target.classList[0];

        if (inputClassName === style.inputTaskTitle) {
            this.setState({
                taskTitle: event.target.value
            });

            return
        };

        if (inputClassName === style.descriptionText) {
            this.setState({
                taskDescription: event.target.value
            });

            return
        };

    };


    newTaskPush = () => {
        let newTitle = this.state.taskTitle.trim();
        let newDescription = this.state.taskDescription.trim();

        if (newTitle && newDescription) {

            let newObject = {
                _id: idGenerator(),
                title: newTitle,
                description: newDescription,
                hidden: this.state.hidden,
                editHidden: this.state.editHidden
            };

            this.props.onTransfer(newObject);

            this.setState({
                taskTitle: "",
                taskDescription: "",
            });

        }

        else {
            alert("Please fill in the box");
        }

    };


    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.newTaskPush();
        }
    };

    render() {

        let { taskTitle, taskDescription } = this.state

        let { onRemoweCheckboxTask, onCheckboxTask } = this.props;

        return <div className={style.tasksInputAndButton}>

            <input
                className={style.inputTaskTitle}
                type="text"
                value={taskTitle}
                onChange={this.changeInputValue}
                onKeyDown={this.handleKeyDown}
            />

            <br></br> <textarea
                type="text"
                className={style.descriptionText}
                value={taskDescription}
                onChange={this.changeInputValue}
                onKeyDown={this.handleKeyDown}>
            </textarea>

            <InputGroup.Append className={style.addAndRemowButtons}>
                <Button className={style.addTaskButton} onClick={this.newTaskPush}>ADD TASK</Button>
                <Button className={style.remoweAllTasks}
                    onClick={onRemoweCheckboxTask}
                    disabled={!onCheckboxTask.size}>
                    REMOWE TASKS
                </Button>
            </InputGroup.Append>

        </div >
    }
}

TaskInput.propTypes = {
    onRemoweCheckboxTask: PropTypes.func.isRequired,
    onCheckboxTask: PropTypes.object.isRequired,
    onTransfer: PropTypes.func.isRequired
}
