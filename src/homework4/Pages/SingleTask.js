import { React, Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { formatDate } from '../helpers/formatTexts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTask from '../Tasks/EditTask';
import { getTask, deleteTask } from '../store/actions';
import { connect } from 'react-redux';

class SingleTask extends Component {
    state = {
        closeWindow: false
    }

    componentDidMount() {
        let taskId = this.props.match.params.taskId;
        this.props.getTask(taskId);
    }

    remowTask = () => {
        const taskId = this.props.task._id;
        this.props.deleteTask(taskId, 'single');
    }

    toggleEdit = () => {
        this.setState({
            closeWindow: !this.state.closeWindow
        })
    }

    render() {

        let { closeWindow } = this.state;
        const { task } = this.props;

        return <div>
            <Container>
                <Row>
                    <Col xs={12} className='mt-5'>

                        {task ?
                            <Card className='text-center'>
                                <Card.Body>
                                    <Card.Title>{task.title}</Card.Title>
                                    <Card.Text>
                                        Description: {task.description}</Card.Text>
                                    <Card.Text>
                                        Date: {formatDate(task.date)}

                                    </Card.Text>
                                    <Button
                                        className='m-1'
                                        variant="warning"
                                        onClick={this.toggleEdit}
                                    >  <FontAwesomeIcon icon={faEdit} /> </Button>
                                    <Button variant="danger"
                                        onClick={this.remowTask}
                                    >   <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Card.Body>
                            </Card> : 'Loading...'}
                    </Col>
                </Row>
            </Container>

            {
                closeWindow &&
                <EditTask
                    onCloseTask={this.toggleEdit}
                    from='single'
                    task={task} />
            }

        </div>
    }

}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTasksSuccess: state.editTasksSuccess
    }
}

const mapDispatchToProps = {
    getTask,
    deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);


