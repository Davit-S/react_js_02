import React, { PureComponent, createRef } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import DatePicker from "react-datepicker";
import { formatDate } from '../helpers/formatTexts';
import { editTask } from '../store/actions';
import {connect} from 'react-redux';
import handleKeyDown from '../helpers/handleKeyDown';


class EditTask extends PureComponent {
    constructor(props) {
        super(props);
        this.inputEditTitle = createRef();
        const {date} = props.task;

        this.state = {
            ...props.task,
            date: date ? new Date(date) : new Date()
        };
    }

    componentDidMount(){
        this.inputEditTitle.current.focus();
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

        const editedTask = {
            _id: this.state._id,
            title,
            description,
            date: formatDate(this.state.date.toISOString())
        };

        this.props.editTask(editedTask, this.props.from)
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
                    onKeyPress={(event) => {handleKeyDown(event.key, this.handleSubmit)}}
                    name='title'
                    className='mb-3'
                    value={title}
                    ref={this.inputEditTitle}
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
};

const mapDispatchToProps = {
    editTask
}

export default connect(null, mapDispatchToProps)(EditTask);