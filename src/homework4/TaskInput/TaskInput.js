import React, { PureComponent, createRef } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from '../helpers/formatTexts';
import { connect } from 'react-redux';
import { addTask } from '../store/actions';
import handleKeyDown from '../helpers/handleKeyDown';

class TaskInput extends PureComponent {

    constructor(props) {
        super(props);
        this.inputTitle = createRef();
    }

    state = {
        taskTitle: "",
        taskDescription: "",
        date: new Date()
    }

    componentDidMount() {
        this.inputTitle.current.focus();
    }


    changeInputValue = (event) => {
        const { name, value } = event.target;
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
        const { taskTitle, taskDescription, date } = this.state
        if (taskTitle) {

            const newObject = {
                title: taskTitle,
                description: taskDescription,
                date: formatDate(date.toISOString())
            };

            this.props.addTask(newObject);
        }

        else {
            return
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
                    onKeyPress={(event) => {handleKeyDown(event.key, this.newTaskPush)}}
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
    onClose: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addTask
};

export default connect(null, mapDispatchToProps)(TaskInput);

