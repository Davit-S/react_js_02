import React, { PureComponent } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import { formatDate } from '../helpers/formatDate'


export default class EditTask extends PureComponent {
    constructor(props) {
        super(props);
        const {date} = props.task;

        this.state = {
            ...props.task,
            date: date ? new Date(date) : new Date()
        };
    }

    changeInputValue = (event) => {
        let { name, value } = event.target;

        this.setState({
            [name]: value
        })
    };

    handleChangeDate=(value)=>{
        this.setState({
          date: value || new Date()
        });
      };

    handleSubmit = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        this.props.onEditTaskTransfer({
            _id: this.state._id,
            title,
            description,
            date: formatDate(this.state.date.toISOString())
        });
    };



    render() {

        let { onCloseTask } = this.props;
        const { title, description } = this.state;

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
                <DatePicker
                    minDate={new Date()}
                    selected={this.state.date}
                    onChange={this.handleChangeDate}
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

