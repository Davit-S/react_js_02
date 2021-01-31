import React, { PureComponent } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class TaskInput extends PureComponent {

    state = {
        taskTitle: "",
        taskDescription: "",
    }


    changeInputValue = (event) => {

        let { name, value } = event.target;

        this.setState({
            [name]: value
        })


    };


    newTaskPush = () => {
        let newTitle = this.state.taskTitle.trim();
        let newDescription = this.state.taskDescription.trim();

        if (newTitle) {

            let newObject = {
                title: newTitle,
                description: newDescription,
            };

            this.props.onTransfer(newObject);

            this.setState({
                taskTitle: "",
                taskDescription: ""
            });

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

        let {onClose} = this.props;

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
                />
                <FormControl
                    placeholder="Description"
                    as="textarea"
                    rows={5}
                    name='taskDescription'
                    onChange={this.changeInputValue}
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
