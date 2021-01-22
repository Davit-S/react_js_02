import React, { Component } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';


export default class EditTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props.objectTask
        };
    }

    changeInputValue = (event) => {
        let {name, value} = event.target;

        this.setState({
            [name]: value
        })
    };

    handleSubmit = ()=>{
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        this.props.onEditTaskTransfer({
          _id: this.state._id,
          title,
          description
        });
    };



    render() {

        let { onCloseTask } = this.props;
        const {title, description} = this.state;

        return <Modal
            show={true}
            onHide={onCloseTask}
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
                    name='title'
                    onKeyPress={this.handleKeyDown}
                    className='mb-3'
                    value={title}
                />
                <FormControl
                    placeholder="Description"
                    as="textarea"
                    rows={5}
                    name='description'
                    onChange={this.changeInputValue}
                    value={description}
                />

            </Modal.Body>


            <Modal.Footer>
                <Button
                    onClick={this.handleSubmit}
                    variant='success'
                >
                    Save
            </Button>
                <Button 
                onClick={onCloseTask}
                variant='secondary'
                >
                    Cancel
                    </Button>
            </Modal.Footer>
        </Modal>

    }
}

EditTask.propTypes = {
    onCloseTask: PropTypes.func.isRequired,
    onEditTaskTransfer: PropTypes.func.isRequired
};

