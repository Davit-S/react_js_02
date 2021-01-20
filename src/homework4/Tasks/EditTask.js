import React, { Component } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';

export default class EditTask extends Component {

    state = {
        taskEditTitle: this.props.objectTask.title,
        taskEditDescription: this.props.objectTask.description
    }


    changeInputValue = (event) => {

        let {name, value} = event.target;

        this.setState({
            [name]: value
        })

        
    };


    render() {

        let { onToggleEditTask, onEditTaskTransfer } = this.props;

        return <Modal
            show={true}
            onHide={onToggleEditTask}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    EDIT TASK
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <FormControl
                    placeholder="Title"
                    onChange={this.changeInputValue}
                    name='taskEditTitle'
                    onKeyPress={this.handleKeyDown}
                    className='mb-3'
                    value={this.state.taskEditTitle}
                />
                <FormControl
                    placeholder="Description"
                    as="textarea"
                    rows={5}
                    name='taskEditDescription'
                    onChange={this.changeInputValue}
                    value={this.state.taskEditDescription}
                />

            </Modal.Body>


            <Modal.Footer>
                <Button
                    onClick={()=>{onEditTaskTransfer(this.props.objectTask._id, this.state.taskEditTitle, this.state.taskEditDescription)}}
                    variant='success'
                >
                    Save
            </Button>
                <Button 
                onClick={onToggleEditTask}
                >
                    Cancel
                    </Button>
            </Modal.Footer>
        </Modal>

    }
}


