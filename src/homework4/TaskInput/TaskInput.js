import React, { PureComponent, createRef } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import {formatDate} from '../helpers/formatDate';


export default class TaskInput extends PureComponent {

    constructor(props){
        super(props);
        this.inputTitle = createRef();
    }

    state = {
        taskTitle: "",
        taskDescription: "",
        date: new Date()
    }

    componentDidMount(){
        this.inputTitle.current.focus();
    }


    changeInputValue = (event) => {

        let { name, value } = event.target;

        this.setState({
            [name]: value
        })


    };

    handleChangeDate = (value) => {
        this.setState({
            date: value || new Date()
        });
    };


    newTaskPush = () => {

        let { taskTitle, taskDescription, date } = this.state

        if (taskTitle) {

            let newObject = {
                title: taskTitle,
                description: taskDescription,
                date: formatDate(date.toISOString())
            };

            this.props.onTransfer(newObject);


        }

        else {
            return
        }

    };


    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.newTaskPush();
        }
    };

    render() {

        let { onClose } = this.props;

        return <Modal
            show={true}
            onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ADD NEW TASK
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <FormControl
                    placeholder="Title"
                    onChange={this.changeInputValue}
                    name='taskTitle'
                    onKeyPress={this.handleKeyDown}
                    className='mb-3'
                    ref={this.inputTitle}
                />
                <FormControl
                    placeholder="Description"
                    as="textarea"
                    rows={5}
                    name='taskDescription'
                    onChange={this.changeInputValue}
                />

                <DatePicker
                    minDate={new Date()}
                    selected={this.state.date}
                    onChange={this.handleChangeDate}
                />

            </Modal.Body>


            <Modal.Footer>
                <Button
                    style={{ backgroundColor: "lime" }}
                    onClick={this.newTaskPush}
                    variant='success'
                >
                    Add task
            </Button>
                <Button
                    onClick={onClose}
                    variant='secondary'>
                    Cancel
                    </Button>
            </Modal.Footer>
        </Modal>

    }
}

TaskInput.propTypes = {
    onTransfer: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}
